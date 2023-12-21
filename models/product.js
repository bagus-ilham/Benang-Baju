"use strict";
const { Model } = require("sequelize");
const formatRupiah = require("../helpers/helper");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Product.belongsTo(models.Category, {foreignKey: "IdCategory"})
        // Product.hasMany(models.ProductHasProfile, { foreignKey: "IdProduct" });
        Product.belongsToMany (models.Profile, {through: "ProductHasProfile", foreignKey : "IdProfile"})
    }

    get formatAngka() {
      return formatRupiah(this.price);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Nama tidak boleh kosong!`,
          },
          notEmpty: {
            msg: `Nama tidak boleh kosong!`},
        },
      },
      totalSales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "totalSales tidak boleh kosong!",
          },
          notEmpty: {
            msg: `totalSales tidak boleh kosong!`,
          },
          
        },
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Size tidak boleh kosong!",
          },
          notEmpty: {
            msg: `Size tidak boleh kosong!`,
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Color tidak boleh kosong!`,
          },
          notEmpty: {
            msg: `Color tidak boleh kosong!`},
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock tidak boleh kosong!",
          },
          notEmpty: {
            msg: `Stock tidak boleh kosong!`,
          },
          min: 1,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price tidak boleh kosong!",
          },
          notEmpty: {
            msg: `Price tidak boleh kosong!`,
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `imgURL tidak boleh kosong!`,
          },
          notEmpty: {
            msg: `imgURL tidak boleh kosong!`},
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Description tidak boleh kosong!`,
          },
          notEmpty: {
            msg: `Description tidak boleh kosong!`},
        },
      },
      IdCategory: DataTypes.INTEGER,
      IdUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
