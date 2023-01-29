'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Reviews';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 3,
          review: '',
          stars: 5
        },
        {
          spotId: 2,
          userId: 1,
          review: '',
          stars: 4
        },
        {
          spotId: 3,
          userId: 2,
          review: '',
          stars: 4
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options, {
      spotId: {
        [Op.in]: [1, 2, 3]
      },
    });
  }
};
