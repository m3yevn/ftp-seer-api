// Imports
const jsftp = require("jsftp");
const logger = require("../config/logger");
const keys = require("../config/keys");

// Functions of controller
exports.listDirectory = (req, res) => {
    try {
        logger.log("info", "List API is started");
        const ftp = newFTP(req);

        ftp.on('error', (err) => {
            if (err)
                throwError(res, err);
        });

        authFTP(req, ftp, (err) => {
            if (err)
                throwError(res, err);
        })

        ftp.ls(req.query.path, (err, ftpres) => {
            let dirList = [];
            if (err)
                throwError(res, err.message);

            if (ftpres.length > 0) {
                ftpres.forEach(file => dirList.push(file))
            };
            logger.log("info", "List API successfully completed.");
            res.json({
                status: "success",
                data: dirList
            })
            //Ensure session ends
            ftp.raw('quit', (err) => {
                if (err)
                    throwError(res, err);
                logger.log("info", "Ftp session ended");
            });
        });
    }
    catch (err) {
        logger.log("error", err);
        res.status(400).json()({
            error: err.code,
            message: { alert: err.message.split(err.code)[1] },
        })
    }
};

exports.getContent = (req, res) => {
    try {
        logger.log("info", "Get API is started");
        const ftp = newFTP(req);

        ftp.on('error', (err) => {
            if (err)
                throwError(res, err);
        });

        authFTP(req, ftp, (err) => {
            if (err)
                throwError(res, err);
        })

        ftp.get(req.query.path, (err, ftpres) => {
            let dataStr = "";
            if (err)
                throwError(res, err.message);

            ftpres.on("data", d => {
                dataStr += d.toString();
            });

            ftpres.on("close", err => {
                if (err) {
                    throwError(res, err.message);
                }
                logger.log("info", "Get API successfully completed.");
                res.json({
                    status: "success",
                    data: dataStr
                })
                //Ensure session ends
                ftp.raw('quit', (err) => {
                    if (err)
                        throwError(res, err);
                    logger.log("info", "Ftp session ended");
                })
            });
            ftpres.resume();
        });
    }
    catch (err) {
        logger.log("error", err);
        res.status(400).json({
            error: err.code,
            message: { alert: err.message },
        })
    }
};

throwError = (res, err) => {
    logger.log("error", err);
    res.status(400).json({
        error: err.code,
        message: { alert: err.message },
    });
}

newFTP = (req) => {
    let Ftp = new jsftp({
        host: req.query.host,
        port: req.query.port
    });
    return Ftp;
}

authFTP = (req, Ftp, error) => {
    Ftp.auth(req.query.username, req.query.password, (err) => {
        error(err);
    })
}
