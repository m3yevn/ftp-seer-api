const Loglestial = require('@techlestial/loglestial').default;

// Initialize Loglestial logger
const logger = Loglestial.init({
  level: process.env.LOG_LEVEL || 'info',
  service: 'ftp-seer-api',
  version: process.env.npm_package_version || '2.1.0',
  environment: process.env.NODE_ENV || 'development'
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Add request logging method for Morgan compatibility
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = logger;
