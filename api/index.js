// Imports
const express = require('express');
const bodyParser = require('body-parser');
const routes = require("../routes");
const morgan = require('morgan');
const logger = require("../utils/logger");
const cors = require('cors');
const responseTime = require('response-time');
const keys = require('../config/keys');
const { version, name,
  description, author,
  license, publicRepo } = require('../package.json');

//Declare Express App //Add bodyparser for JSON  //Add CORS policy
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())

//Add logging with Morgan //Request data invalid format
app.use(responseTime());
morgan.token('date', () => {
  const p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
  return (p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]);
});
app.use(morgan('combined', { stream: logger.stream }));

//Serve static HTML //Add routes called ftpseer //Add 404 route
const path = require('path');
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
app.use('/favicon.ico', express.static(path.join(publicPath, 'favicon.ico')));
app.get('/favicon.ico', (req, res) => res.status(204));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use('/api', routes);

app.use('*', (_, res) => {
  res.status(404).json({ error: 404, message: "Route not found" });
});

//Start the app at declare port
const port = process.env.PORT || keys.port;
// For Vercel: use default host (undefined), for local development: use 0.0.0.0 for WSL
const host = process.env.VERCEL ? undefined : (process.env.HOST || '0.0.0.0');

// Export app for Vercel
module.exports = app;

// Start server only in non-Vercel environments
if (!process.env.VERCEL) {
  app.listen(port, host, () => {
    logger.info(`Server is listening at ${host || 'default'}:${port}`, {
      port: port,
      host: host || 'default',
      environment: process.env.NODE_ENV || 'development',
      version: version,
      platform: process.env.VERCEL ? 'vercel' : 'local',
      accessUrl: `http://${host || 'localhost'}:${port}`,
      packageInfo: {
        name: name,
        description: description,
        author: author,
        license: license,
        publicRepo: publicRepo
      }
    });

    console.log(`🚀 Server running on port ${port}`);
    console.log(`📦 ${name} v${version} - ${description}`);
    console.log(`👤 Author: ${author}`);
    console.log(`📄 License: ${license}`);
    console.log(`🔗 Repository: ${publicRepo}`);
    console.log(`🌐 Access from Windows browser: http://localhost:${port}`);
    console.log(`🔗 Direct WSL access: http://172.18.240.145:${port}`);
    console.log(`📱 Access from WSL: http://localhost:${port}`);
  });
}