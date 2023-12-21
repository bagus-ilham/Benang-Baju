"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Profile, {foreignKey: "IdUser"})
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
        hooks: {
            afterCreate: async (value, options) => {
                await sequelize.models.profile.create({
                    IdUser: value.id
                })
            }
        },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
