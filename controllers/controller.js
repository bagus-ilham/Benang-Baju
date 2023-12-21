const { Product, User, Profile } = require("../models");
const bcrypt = require("bcryptjs");

class Controller {
  static async landingPage(req, res) {
    try {
      let user = req.session.userId;
      res.render("LandingPage", { user });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async products(req, res) {
    try {
      let data = await Product.findAll();
      let user = req.session.userId;
      // res.send(data);
      res.render("HomeProduct", { data, user });
    } catch (error) {
      res.send(error);
    }
  }

  static async productId(req, res) {
    try {
      let paramsId = req.params.productId;
      let user = req.session.userId;
      let data = await Product.findOne({
        where: {
          id: paramsId,
        },
      });
      res.render("ProductId", { user });
    } catch (error) {
      res.send(error);
    }
  }

  static async profile(req, res) {
    try {
      let user = req.session.userId;
      let data = await Profile.findOne({
        include : User,
        where : {
            IdUser : user
        }
      })
      let fullName = Profile.fullName(data.firstName, data.lastName);
      res.render("ProvileId", { user, data, fullName });
    } catch (error) {
      res.send(error);
    }
  }

  static async cart(req, res) {
    try {
      let user = req.session.userId;
      res.render("Cart", { user });
    } catch (error) {
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      let user = req.session.userId;
      res.render("Login", { user });
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
      console.log(req.session);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      let user = req.session.userId;
      res.render("Register", { user });
    } catch (error) {
      res.send(error);
    }
  }

  static async registered(req, res) {
    try {
        let user = req.session.userId;
        let data = req.body;
        await User.create(data);
        res.redirect('/')
        // console.log(data);
    } catch (error) {
        res.send(error)
    }
  }

  static async logout(req, res) {
    try {
      await req.session.destroy();
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
