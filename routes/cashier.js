var express = require('express');
var router = express.Router();

const cashierController = require('../controllers/cashier')

// display product page
router.get('/', cashierController.cashier);

module.exports = router;