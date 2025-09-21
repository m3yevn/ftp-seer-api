const jsftp = require("jsftp");
const logger = require("../utils/logger");

class FtpService {
  constructor() {
    this.logger = logger;
  }

  /**
   * Create a new FTP connection
   * @param {Object} params - Connection parameters
   * @param {string} params.host - FTP host
   * @param {number} params.port - FTP port
   * @param {string} params.username - FTP username
   * @param {string} params.password - FTP password
   * @returns {Promise<Object>} FTP connection instance
   */
  async createConnection({ host, port, username, password }) {
    return new Promise((resolve, reject) => {
      try {
        const ftp = new jsftp({
          host: host,
          port: parseInt(port) || 21
        });

        ftp.on('error', (err) => {
          this.logger.error('FTP connection error', { error: err.message, host, port });
          reject(new Error(`FTP connection failed: ${err.message}`));
        });

        // Default to anonymous if username/password not provided
        const authUsername = username || 'anonymous';
        const authPassword = password || 'anonymous';

        ftp.auth(authUsername, authPassword, (err) => {
          if (err) {
            this.logger.error('FTP authentication failed', { error: err.message, host, username: authUsername });
            reject(new Error(`FTP authentication failed: ${err.message}`));
          } else {
            this.logger.info('FTP connection established', { host, port, username: authUsername });
            resolve(ftp);
          }
        });
      } catch (error) {
        this.logger.error('FTP connection creation failed', { error: error.message });
        reject(error);
      }
    });
  }

  /**
   * List directory contents
   * @param {Object} params - FTP parameters
   * @param {string} params.host - FTP host
   * @param {number} params.port - FTP port
   * @param {string} params.username - FTP username
   * @param {string} params.password - FTP password
   * @param {string} params.path - Directory path
   * @returns {Promise<Array>} Directory listing
   */
  async listDirectory({ host, port, username, password, path }) {
    this.logger.info('Starting directory listing', { host, path });
    
    try {
      const ftp = await this.createConnection({ host, port, username, password });
      
      return new Promise((resolve, reject) => {
        ftp.ls(path, (err, ftpres) => {
          if (err) {
            this.logger.error('Directory listing failed', { error: err.message, path });
            this.closeConnection(ftp);
            reject(new Error(`Directory listing failed: ${err.message}`));
            return;
          }

          const dirList = ftpres || [];
          this.logger.info('Directory listing completed', { 
            path, 
            itemCount: dirList.length 
          });

          this.closeConnection(ftp);
          resolve(dirList);
        });
      });
    } catch (error) {
      this.logger.error('Directory listing error', { error: error.message, path });
      throw error;
    }
  }

  /**
   * Get file content
   * @param {Object} params - FTP parameters
   * @param {string} params.host - FTP host
   * @param {number} params.port - FTP port
   * @param {string} params.username - FTP username
   * @param {string} params.password - FTP password
   * @param {string} params.path - File path
   * @returns {Promise<string>} File content
   */
  async getFileContent({ host, port, username, password, path }) {
    this.logger.info('Starting file retrieval', { host, path });
    
    try {
      const ftp = await this.createConnection({ host, port, username, password });
      
      return new Promise((resolve, reject) => {
        ftp.get(path, (err, ftpres) => {
          if (err) {
            this.logger.error('File retrieval failed', { error: err.message, path });
            this.closeConnection(ftp);
            reject(new Error(`File retrieval failed: ${err.message}`));
            return;
          }

          let dataStr = "";
          
          ftpres.on("data", (chunk) => {
            dataStr += chunk.toString();
          });

          ftpres.on("close", (err) => {
            if (err) {
              this.logger.error('File stream closed with error', { error: err.message, path });
              this.closeConnection(ftp);
              reject(new Error(`File stream error: ${err.message}`));
              return;
            }

            this.logger.info('File retrieval completed', { 
              path, 
              contentLength: dataStr.length 
            });
            
            this.closeConnection(ftp);
            resolve(dataStr);
          });

          ftpres.resume();
        });
      });
    } catch (error) {
      this.logger.error('File retrieval error', { error: error.message, path });
      throw error;
    }
  }

  /**
   * Close FTP connection gracefully
   * @param {Object} ftp - FTP connection instance
   */
  closeConnection(ftp) {
    try {
      ftp.raw('quit', (err) => {
        if (err) {
          this.logger.info('FTP connection close warning', { error: err.message });
        } else {
          this.logger.info('FTP connection closed successfully');
        }
      });
    } catch (error) {
      this.logger.info('FTP connection close error', { error: error.message });
    }
  }

  /**
   * Validate FTP connection parameters
   * @param {Object} params - Connection parameters
   * @returns {Object} Validation result
   */
  validateParams(params) {
    const { host, port, username, password, path } = params;
    const errors = [];

    if (!host) errors.push('Host is required');
    if (!path) errors.push('Path is required');
    if (port && (isNaN(port) || port < 1 || port > 65535)) {
      errors.push('Port must be a valid number between 1 and 65535');
    }

    // Username and password are optional for anonymous FTP access
    // If not provided, we'll use 'anonymous' as default

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = new FtpService();
