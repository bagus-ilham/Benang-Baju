'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductHasProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductHasProfile.belongsTo(models.Product, {foreignKey: "IdProduct"})
      ProductHasProfile.belongsTo(models.Profile, { foreignKey: "IdProfile" });
    }
  }
  ProductHasProfile.init({
    IdProduct: DataTypes.INTEGER,
    IdProfile: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductHasProfile',
  });
  return ProductHasProfile;
};