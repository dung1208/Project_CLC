var express = require('express');
var router = express.Router();

const exchangeController = require('../controllers/exchange')

// display product page
router.get('/orders', exchangeController.list_orders);
router.get('/orderstock', exchangeController.list_orders_stock);

module.exports = router;
