const ftpService = require("../services/ftpService");
const logger = require("../utils/logger");

class FtpController {
  /**
   * List directory contents
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async listDirectory(req, res) {
    try {
      logger.info("Directory listing request received", {
        host: req.query.host,
        path: req.query.path,
        ip: req.ip
      });

      // Validate request parameters
      const validation = ftpService.validateParams(req.query);
      if (!validation.isValid) {
        logger.info("Invalid request parameters", { errors: validation.errors });
        return res.status(400).json({
          status: "error",
          message: "Invalid request parameters",
          errors: validation.errors
        });
      }

      // Call service to list directory
      const directoryData = await ftpService.listDirectory(req.query);
      
      logger.info("Directory listing completed successfully", {
        host: req.query.host,
        path: req.query.path,
        itemCount: directoryData.length
      });

      res.json({
        status: "success",
        data: directoryData,
        metadata: {
          host: req.query.host,
          path: req.query.path,
          itemCount: directoryData.length,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      logger.error("Directory listing failed", {
        error: error.message,
        host: req.query.host,
        path: req.query.path,
        stack: error.stack
      });

      res.status(500).json({
        status: "error",
        message: "Failed to list directory",
        error: error.message
      });
    }
  }

  /**
   * Get file content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getContent(req, res) {
    try {
      logger.info("File content request received", {
        host: req.query.host,
        path: req.query.path,
        ip: req.ip
      });

      // Validate request parameters
      const validation = ftpService.validateParams(req.query);
      if (!validation.isValid) {
        logger.info("Invalid request parameters", { errors: validation.errors });
        return res.status(400).json({
          status: "error",
          message: "Invalid request parameters",
          errors: validation.errors
        });
      }

      // Call service to get file content
      const fileContent = await ftpService.getFileContent(req.query);
      
      logger.info("File content retrieved successfully", {
        host: req.query.host,
        path: req.query.path,
        contentLength: fileContent.length
      });

      res.json({
        status: "success",
        data: fileContent,
        metadata: {
          host: req.query.host,
          path: req.query.path,
          contentLength: fileContent.length,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      logger.error("File content retrieval failed", {
        error: error.message,
        host: req.query.host,
        path: req.query.path,
        stack: error.stack
      });

      res.status(500).json({
        status: "error",
        message: "Failed to retrieve file content",
        error: error.message
      });
    }
  }
}

// Create controller instance
const ftpController = new FtpController();

// Export methods
module.exports = {
  listDirectory: (req, res) => ftpController.listDirectory(req, res),
  getContent: (req, res) => ftpController.getContent(req, res)
};
