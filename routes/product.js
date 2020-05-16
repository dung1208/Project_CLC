var express = require('express');
var router = express.Router();

const productController = require('../controllers/product')

// display product page
router.get('/', productController.list_product);
router.get('/add', productController.display_add_product);

module.exports = router;