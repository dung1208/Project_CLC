var express = require('express');
var router = express.Router();

const loginController = require('../controllers/login')

/* GET home page. */
router.get('/', loginController.login);

module.exports = router;
