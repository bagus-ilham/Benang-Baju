class Controller {
    static async landingPage(req, res) {
        try {
            res.render("LandingPage")
        } catch (error) {
            res.send(error);
        }
    }

    static async products(req, res) {
        try {
            res.render("HomeProduct")
        } catch (error) {
            res.send(error);
        }
    }

    static async productId(req, res) {
        try {
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

    static async landingPage(req, res) {
        try {
            res.render("LandingPage")
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = Controller;