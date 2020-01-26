// Imports
const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const morgan = require('morgan');
const winston = require('./config/winston');
const logger = require("./config/logger");
const cors = require('cors');
const responseTime = require('response-time');
const keys = require('./config/keys');

//Declare Express App //Add bodyparser for JSON  //Add CORS policy
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())

//Add logging with Morgan //Request data invalid format
app.use(responseTime());
morgan.token('date', () => {
  const p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});
app.use(morgan('combined',{ stream: winston.stream }));

//Add welcome notes //Add routes called ftpseer //Add 404 route
app.get('/', (_, res) => res.send('Welcome to FTP Seer Server'));
app.use('/ftpseer', routes)
app.use('*', (_, res) => {
  res.status(404).json({error:404,message:"Route not found"});
});

//Start the app at declare port
app.listen(keys.port, () => {
    logger.log('info',`Server is listening at ${keys.port}`);
});