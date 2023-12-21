const { Product, User } = require("../models");
const bcrypt = require("bcryptjs");

class Controller {
  static async landingPage(req, res) {
    try {
        let user = req.session.userId;
      res.render("LandingPage", {user});
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async products(req, res) {
    try {
      let data = await Product.findAll();
      // res.send(data);
      res.render("HomeProduct", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async productId(req, res) {
    try {
      let paramsId = req.params.productId;
      let data = await Product.findOne({
        where: {
          id: paramsId,
        },
      });
      res.render("ProductId");
    } catch (error) {
      res.send(error);
    }
  }

  static async profile(req, res) {
    try {
      res.render("ProvileId");
    } catch (error) {
      res.send(error);
    }
  }

  static async cart(req, res) {
    try {
      res.render("Cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      res.render("Login");
    } catch (error) {
      res.send(error);
    }
  }

  static async loginProccess(req, res) {
    try {
      let emailBody = req.body.email;
      let password = req.body.password;
      let result = await User.findOne({ where: { email: emailBody } });
      if (!result) {
        console.log(`gagal`);
      }
      if (result) {
        const isValidPassword = bcrypt.compareSync(password, result.password);
        req.session.userId = result.id;
        if (isValidPassword) {
          res.redirect("/");
        } else {
          res.redirect("/login?error=Password Tidak Sesuai");
        }
      } else {
        res.redirect("/login?error=Email Tidak Terdaftar");
      }
      console.log(result);
      console.log(req.session, `=====`, emailBody, `-=======`, password);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      res.render("Register");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
