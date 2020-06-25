var express = require('express');
var router = express.Router();

const dashboardController = require('../controllers/dashboard')

/* GET home page. */
router.get('/', dashboardController.dashboard);
router.get('/dashboard', dashboardController.dashboard);

module.exports = router;
