
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
       status: 'API Healthy',
       message: 'Welcome to MESFTP Server!'
    }
    );
});

// Import contact controller
var ftpController = require('./ftp/ftpController');
// Contact routes
router.route('/list')
    .post(ftpController.list);
router.route('/get')
    .post(ftpController.get);

// Export API routes
module.exports = router;