const express = require('express')
const router = express.Router()
const Controller = require('../Controller/userController')



router.get('/form', Controller.getForm)
//router.post('/test', Controller.showResult)
router.post('/register' , Controller.addUser)
router.post('/login' , Controller.login)
router.post('/send_otp', Controller.sendOtp)
router.post('/verify_otp', Controller.verifyOtpAndChangePassword)
router.get('/get-all-products', Controller.getAllProducts)
router.post('/add-to-cart', Controller.AddToCart)
router.get('/get-my-cart', Controller.GetMyCart)

//all changes here
router.get('/get-my-detailed-cart', Controller.getDetailedCartdata) 
 
router.post('/update-quantity', Controller.handleQunatity) 
router.post('/purchase_order', Controller.PurchaseOrder) 
router.get('/get-orders-history', Controller.getAllOrders) 







module.exports = router