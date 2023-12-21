const { Product, User, Profile, Category, ProductHasProfile } = require("../models");
const bcrypt = require("bcryptjs");
const formatRupiah = require('../helpers/helper');

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
      res.render("ProductId", { data, user });
    } catch (error) {
      res.send(error);
    }
  }

  static async profile(req, res) {
    try {
      let user = req.session.userId;
      let data = await Profile.findOne({
        include: User,
        where: {
          IdUser: user,
        },
      });
      let fullName = Profile.fullName(data.firstName, data.lastName);
      res.render("ProvileId", { user, data, fullName });
    } catch (error) {
      res.send(error);
    }
  }

  static async cart(req, res) {
    try {
      let user = req.session.userId;
      // console.log(user);
      let data = await ProductHasProfile.findAll({
        include: [
          {
            model: Profile,
          },
          {
            model: Product,
          },
        ],
        where: {
            IdProfile: user
        }
      });
      // let value = await 
      let value = 0
      for(let i = 0; i < data.length; i++) {
        value += data[i].Product.price;
      }
      // res.send({value})
        res.render("Cart", { data, user, value, formatRupiah });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
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
      //   console.log(req.session);
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
      res.redirect("/");
      // console.log(data);
    } catch (error) {
      res.send(error);
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

  static async editProfile(req, res) {
    try {
      let user = req.session.userId;
      let idParams = req.params.profileid;
      let data = await Profile.findOne({
        where: {
          id: idParams,
        },
      });
      res.render("EditProfile", { data, user });
    } catch (error) {
      res.send(error);
    }
  }

  static async editProfileRedirect(req, res) {
    try {
      let idParams = req.params.profileid;
      let data = req.body;
      await Profile.update(
        { data },
        {
          where: {
            id: idParams,
          },
        }
      );
      res.redirect("/profile");
    } catch (error) {
      res.send(error);
    }
  }

  static async addProduct(req, res) {
    try {
      let {error} = req.query;
      let e = [];
      if(error) {
        e = error.split(",")
      }
      let user = req.session.userId;
      let data = await Category.findAll();
      res.render("AddProduct", { user, data, e });
    } catch (error) {
      res.send(error);
    }
  }

  static async addProductRedirect(req, res) {
    let idParams = req.params.profileid;
    let user = req.session.userId;
    try {
      let data = req.body;
      data.IdCategory = +data.IdCategory;
      data.totalSales = 0;
      data.IdUser = +idParams;
    //   res.send(data);
      await Product.create(data);
      res.redirect('/product')
    } catch (error) {
      // let failed = [];
      // for(let i = 0; i < error.errors.length; i++) {
      //   failed.push(error.errors[i].message)
      // }
      // res.send(failed);
      const { name } = error;
      if(name === "SequelizeValidationError") {
        let result = error.errors.map(el => {
          return el.message;
        });
        res.redirect(`/profile/${idParams}/addProduct?error=${result}`);
      }
    }
  }

  static async delete(req, res) {
    try {
      let idParams = req.params.id;
      let data = await ProductHasProfile.destroy({
        where: {
          IdProduct: idParams
        }
      })
      res.redirect('/cart');
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }
}

module.exports = Controller;
