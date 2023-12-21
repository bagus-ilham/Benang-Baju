const { Product } = require('../models');

class Controller {
    static async landingPage(req, res) {
        try {

            res.render("LandingPage")
        } catch (error) {
            res.send(error);
            console.log(error)
        }
    }

    static async products(req, res) {
        try {
          let data = await Product.findAll();
          // res.send(data);
          res.render("HomeProduct", {data});
        } catch (error) {
            res.send(error);
        }
    }

    static async productId(req, res) {
        try {
            let paramsId = req.params.productId;
            let data = await Product.findOne({
                where: {
                    id: paramsId
                }
            })
            res.render("ProductId")
        } catch (error) {
            res.send(error);
        }
    }

    static async profile(req, res) {
        try {
            res.render("ProvileId")
        } catch (error) {
            res.send(error);
        }
    }

    static async cart(req, res) {
        try {
            res.render("Cart")
        } catch (error) {
            res.send(error);
        }
    }

    static async login(req, res) {
        try {
            res.render("Login")
        } catch (error) {
            res.send(error);
        }
    }

    static async register(req, res) {
        try {
            res.render("Register")
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = Controller;