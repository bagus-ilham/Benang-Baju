const { Product } = require('../models');

class Controller {
    static async landingPage(req, res) {
        try {
            let data = await Product.findAll();
            res.send(data);
            // res.render("LandingPage")
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;