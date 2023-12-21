class Controller {
    static async landingPage(req, res) {
        try {
            res.render("LandingPage")
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;