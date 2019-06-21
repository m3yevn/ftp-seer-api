// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes")
// Import logger
var morgan = require('morgan');
// Import winston
var winston = require('./config/winston');
// Import moment timezone
const moment = require('moment-timezone');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  morgan.token('date', function() {
    var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});

app.use(morgan('combined',{ stream: winston.stream }));

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Setup server port
var port = process.env.PORT || 5009;
// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to MESFTP Server'));
// Use Api routes in the App
app.use('/mesftp-server', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
  
});