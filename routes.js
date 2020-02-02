//Imports
const router = require('express').Router();
const ftpController = require('./controller/ftp');

//API healthcheck
router.get('/',  (_, res) => {
    res.json({
       status: 'HEALTHY',
       message: 'Welcome to FTP Seer Server!',
       routes:[
           {
            path: '/directory',
            parameters: 'host,port,username,password,path',
            method: 'GET',
            description: 'Retrieving the directory list'
           },
           {
            path: '/file',
            parameters: 'host,port,username,password,path',
            method: 'GET',
            description: 'Retrieving the file content'
           }
       ]
    }
    );
});

// Contact routes
router.route('/directory').get(ftpController.listDirectory);
router.route('/file').get(ftpController.getContent);

// Export API routes
module.exports = router;
