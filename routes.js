//Imports
const router = require('express').Router();
const ftpController = require('./controller/ftp');

//API healthcheck
router.get('/',  (_, res) => {
    res.json({
       status: 'API Healthy',
       message: 'Welcome to FTP Seer Server!'
    }
    );
});

// Contact routes
router.route('/directory').get(ftpController.listDirectory);
router.route('/file').get(ftpController.getContent);

// Export API routes
module.exports = router;
