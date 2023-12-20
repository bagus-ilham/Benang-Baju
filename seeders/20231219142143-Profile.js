'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8')).map(item => {
    item.createdAt = item.updatedAt = new Date()
    return item
   })
   await queryInterface.bulkInsert('Profiles', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
