const express = require("express");
const router = express.Router();
const Controller = require('../controllers/controller');

    router.get('/', "middleeware", Controller.landingPage) 


module.exports = router;