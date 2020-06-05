var express = require('express');
var router = express.Router();

const dashBoardController = require('../controllers/dashboard')

/* GET home page. */
router.get('/', dashBoardController.dashboard);

module.exports = router;
