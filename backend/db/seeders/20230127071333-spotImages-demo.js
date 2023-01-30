'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// options.tableName = 'SpotImages';

// /** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg',
          preview: true
        },
        {
          spotId: 2,
          url: 'https://cdn11.bigcommerce.com/s-g95xg0y1db/images/stencil/1280w/carousel/28/pool_house_plan_riverview_exterior__63449.jpg?c=1',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_33/1599433/pie-house-mc-main1-2008118.jpg',
          preview: true
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options, {
        spotId: {
          [Op.in]: [1, 2, 3]
        },
      });
  }
};
