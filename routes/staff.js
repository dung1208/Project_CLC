var express = require('express');
var router = express.Router();

const StaffController = require('../controllers/staff');

router.get('/', StaffController.list_staff);
router.get('/add', StaffController.display_add);
router.post('/add', StaffController.add);
router.get('/edit/(:id)', StaffController.display_edit);
router.post('/update/:id', StaffController.update);

module.exports = router;