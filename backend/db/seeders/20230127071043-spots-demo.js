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
          description: 'Located inside is a basement that is believed to contain the secrets and truth of the titans that have decimated humanity, resulting in the surviving population sheltering behind the walls of Paradis.',
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
          description: 'A newly renovated house located in a designated area of land for descendants of Ymir Fritz in a segregated part of Marley to live.',
          price: 5.99
        },
        {
          ownerId: 3,
          address: '8888 Rocks Comingyour Way',
          city: 'Outer Wall Rose',
          state: 'Wall Rose',
          country: 'Paradis Island',
          lat: 117.2340,
          lng: 32.8801,
          name: 'Utgard Castle',
          description: 'Abandoned castle used temporarily by members of the Survey Corps. Beware of Beast Titan.',
          price: 17
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options, {
      country: {
        [Op.in]: [1, 2, 3]
      },
    });
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
