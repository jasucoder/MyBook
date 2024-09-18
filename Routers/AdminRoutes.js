const express = require('express');
const router = express.Router()
const admincontroller = require('../Controller/AdminController')


//router.get('/Welcome', admincontroller.showWelcome)

router.post('/add-product', admincontroller.AddProducts)


module.exports = router;

