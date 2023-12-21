const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

const loggedIn = (req, res, next) => {
    const { userId, cookie} = req.session;

    if(userId) {
        res.redirect('/')
    } else {
        next()
    }
     
}

router.get("/", Controller.landingPage);
router.get("/product", Controller.products);
router.get("/product/:productId", Controller.productId);
router.get("/profile", Controller.profile);
router.get("/profile/:profileid/edit");
router.post("/profile/:profileid/edit");
router.get("/profile/:profileid/addProduct");
router.post("/profile/:profileid/addProduct");
router.get("/cart", loggedIn, Controller.cart);
router.get("/cart/delete")
router.get("/login", loggedIn, Controller.login);
router.post("/login", loggedIn, Controller.loginProccess);
router.get("/register", loggedIn, Controller.register);
router.post("/register", Controller.registered)
router.get("/logout", Controller.logout)

module.exports = router;
