const express = require("express");
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.landingPage) 
router.get('/product', Controller.products) 
router.get('/product/:productId', Controller.productId)
router.get('/profile', Controller.profile) 
router.get('/cart', Controller.cart)
router.get('/login', Controller.login)
router.get('/register', Controller.register)


module.exports = router;