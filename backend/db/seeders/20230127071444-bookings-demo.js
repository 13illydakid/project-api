'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// options.tableName = 'Bookings';

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options,
      [
        {
          spotId: 1,
          userId: 3,
          startDate: new Date('November 19, 2023'),
          endDate: new Date('November 20, 2023')
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date('July 14, 2023'),
          endDate: new Date('July 16, 2023')
        },
        {
          spotId: 3,
          userId: 2,
          startDate: new Date('April 10, 2023'),
          endDate: new Date('April 15, 2023')
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      },
    }, {});
  }
};
