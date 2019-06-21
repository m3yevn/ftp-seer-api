// ftpController.js
const jsftp = require("jsftp");
const logger = require("../config/logger")

// Handle index actions
exports.list = function (req, res , next) {
    try{
    logger("info","List API is started");
    var ftp = newFTP(req);
    
    ftp.on('error', function(err) {
        if(err)
        throwError(res,err);
    });

    authFTP(req,ftp,function(err){
        if(err)
        throwError(res,err);
    })
    
    ftp.ls(req.body.path, (err, ftpres) => {
        var dirList = [];
        if(err)
        throwError(res,err.message);
        
        if(ftpres.length > 0){
        ftpres.forEach(file => dirList.push(file)) 
        };
        logger("info","List API successfully completed.");
            res.json({
                statusCode: 200,
                statusMessage: "success",
                data: dirList
            })
      });
    }
    catch(err){
        logger("error",err);
        res.json({
            statusCode: err.code,
            statusMesage: err.message,
        })
    }
};

// Handle index actions
exports.get = function (req, res , next) {
    try{
    logger("info","Get API is started");
    var ftp = newFTP(req);
    
    ftp.on('error', function(err) {
        if(err)
        throwError(res,err);
    });

    authFTP(req,ftp,function(err){
        if(err)
        throwError(res,err);
    })
    
    ftp.get(req.body.path, (err, ftpres) => {
        var dataStr = ""; 
        if(err)
        throwError(res,err.message);
        
        ftpres.on("data", d => {
            dataStr += d.toString();
          });
         
        ftpres.on("close", err => {
            if (err) {
                throwError(res,err.message);
            }
            logger("info","Get API successfully completed.");
            res.json({
                statusCode: 200,
                statusMessage: "success",
                data: dataStr
            })
          });
         
          ftpres.resume();
      });
    }
    catch(err){
        logger("error",err);
        res.json({
            statusCode: err.code,
            statusMesage: err.message,
        })
    }
};

function throwError(res,err){
    logger("error",err);
    res.json({
        statusCode: err.code,
        statusMessage: err.message,
    });
}

function newFTP(req){
    let Ftp = new jsftp({
        host: req.body.host,
        port: req.body.port
      });
      return Ftp;
}

function authFTP(req,Ftp,error){
    Ftp.auth(req.body.user,req.body.pass,function(err){
        error(err);
    })
}