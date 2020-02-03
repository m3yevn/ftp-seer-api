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
const {version,name,
      description,author,
      license, publicRepo} = require('./package.json');

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

//Serve static HTML //Add routes called ftpseer //Add 404 route
app.use('/', express.static('public'))
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/ftpseer', routes)
app.use('*', (_, res) => {
  res.status(404).json({error:404,message:"Route not found"});
});

//Start the app at declare port
app.listen(process.env.PORT || keys.port, () => {
    logger.log('info',`Server is listening at ${process.env.PORT || keys.port}`);
});