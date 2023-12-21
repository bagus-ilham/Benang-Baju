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
    static associate(models) {}

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
          notEmpty: `Nama tidak boleh kosong!`,
        },
      },
      totalSales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock tidak boleh kosong!",
          },
          notEmpty: {
            msg: `Stock tidak boleh kosong!`,
          },
          
        },
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock tidak boleh kosong!",
          },
          notEmpty: {
            msg: `Stock tidak boleh kosong!`,
          },
        },
      },
      color: DataTypes.STRING,
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
      price: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      description: DataTypes.STRING,
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
