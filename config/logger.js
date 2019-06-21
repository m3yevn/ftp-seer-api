const logger = require("../config/winston.js");

function stream(option,message,data)
{
    var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    date= p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5];
    message ="::c - - [" + date +"] "+message;
    if(data)
    message += "--"+JSON.stringify(data);
    switch(option)
    {
        case "info":
            logger.info(message);
            break;
        case "error":
            logger.error(message);
            break;
        case "debug":
            logger.debug(message);
            break;
    }
}

module.exports = stream;