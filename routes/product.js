var express = require('express');
var router = express.Router();

const productController = require('../controllers/product')

// display product page
router.get('/', productController.list_product);
router.get('/add', productController.display_add_product);
router.post('/add', productController.add);
// router.get('/edit/(:id)', productController.display_edit);

module.exports = router;
