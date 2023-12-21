const express = require("express");
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.landingPage) 
router.get('/product', Controller.products) 
router.get('/profile', Controller.profile) 
router.get('/cart', Controller.cart)


module.exports = router;