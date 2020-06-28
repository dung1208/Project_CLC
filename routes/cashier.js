var express = require('express');
var router = express.Router();

const cashierController = require('../controllers/cashier')

// display cashier page
router.get('/', cashierController.cashier);
router.get('/search/:q', cashierController.live_search);
router.post('/submit', cashierController.postOrderDetails);
module.exports = router;