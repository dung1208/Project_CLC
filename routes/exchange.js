var express = require('express');
var router = express.Router();

const exchangeController = require('../controllers/exchange')

// display product page
router.get('/orders', exchangeController.list_orders);
router.get('/orderstock', exchangeController.list_orders_stock);
router.get('/orderstock/add',exchangeController.add_order_stock);
router.get('/orderstock/search/:q',exchangeController.live_search);
router.post('/orderstock/submit', exchangeController.postOrderDetails);

module.exports = router;
