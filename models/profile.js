'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {foreignKey: "IdUser"})
      // Profile.hasMany(models.ProductHasProfile, { foreignKey: "IdProfile" });
      Profile.belongsToMany(models.Product, {through: "ProductHasProfile", foreignKey : "IdProduct"})
    }

    static fullName(firstName, lastName) {
      return `${firstName} ${lastName}`;
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    IdUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};