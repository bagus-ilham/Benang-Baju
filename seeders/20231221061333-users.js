"use strict";
const bcrypt  = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    /**
     * Add seed commands here.
    *
    * Example:
    * await queryInterface.bulkInsert('People', [{
    *   name: 'John Doe',
    *   isBetaMember: false
    * }], {});
    */
    const salt = bcrypt.genSaltSync(10);
    let data = require("../data/users.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = bcrypt.hashSync(el.password, salt);
      return el;
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
