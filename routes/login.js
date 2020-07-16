var express = require('express');
var router = express.Router();

const userController = require('../controllers/login');

// display login page
router.get('/login', userController.login);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;