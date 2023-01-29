'use strict';

// /** @type {import('sequelize-cli').Migration} */


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: 'https://archello.s3.eu-central-1.amazonaws.com/images/2018/03/31/American-style-house-interior-design-in-Dammam-2.1522524114.1883.jpg'
        },
        {
          reviewId: 2,
          url: 'https://i.pinimg.com/originals/9a/28/6f/9a286f1b388c258087a1140bbdbe499a.jpg'
        },
        {
          reviewId: 3,
          url: 'https://livinginatiny.com/wp-content/uploads/2021/02/Tiny-house-with-amazing-interior-design_3.jpeg'
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options, {
      reviewId: {
        [Op.in]: [1, 2, 3]
      },
    });
  }
};
