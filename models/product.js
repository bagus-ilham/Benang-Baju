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
      
    }

    get formatAngka() {
      return formatRupiah(this.price)
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      totalSales: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      color: DataTypes.STRING,
      stock: DataTypes.INTEGER,
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
