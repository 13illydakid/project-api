'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: '0001 Tatakae Drive',
          city: 'Shiganshina District',
          state: 'Wall Maria',
          country: 'Paradis Island',
          lat: 157.8581,
          lng: 21.3099,
          name: 'Residence of Eren Yeager',
          description: '',
          price: 845
        },
        {
          ownerId: 2,
          address: '1515 Eren Rampage Street',
          city: 'Liberio',
          // state: 'Destroyed',
          state: 'Trampled',
          country: 'Marley',
          lat: 114.1694,
          lng: 22.3193,
          name: 'Internment zone',
          description: '',
          price: 5.99
        },
        {
          ownerId: 3,
          address: '',
          city: 'Outer Wall Rose',
          state: 'Wall Rose',
          country: 'Paradis Island',
          lat: ,
          lng: ,
          name: 'Utgard Castle',
          description: '',
          price: 17
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        country: {
          [Op.in]: ['']
        },
      }
    )
  }
};

// {
//   ownerId: 1,
//   address: '0001 Tata',
//   city: 'San Diego',
//   state: 'California',
//   country: 'United States',
//   lat: ,
//   lng: ,
//   name: '',
//   description: '',
//   price:
// },
// {
//   ownerId: 2,
//   address: '',
//   city: 'Irvine',
//   state: 'California',
//   country: 'United States',
//   lat: ,
//   lng: ,
//   name: '',
//   description: '',
//   price:
// },
