var express = require('express');
var router = express.Router();

const userController = require('../controllers/login');

// display login page
router.get('/', userController.login);
router.post('/', userController.login);

module.exports = router;