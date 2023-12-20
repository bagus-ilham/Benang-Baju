'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = JSON.parse(fs.readFileSync('./data/Products.json', 'utf-8')).map(item => {
    item.createdAt = item.updatedAt = new Date()
    return item
   })
   await queryInterface.bulkInsert('Products', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
