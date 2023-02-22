'use strict';
const bcrypt = require('bcryptjs');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options,
      [
        {
          email: 'demo1@user.io',
          username: 'Demo_User',
          firstName: 'Demo',
          lastName: 'User',
          hashedPassword: bcrypt.hashSync('passwords')
        },
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          firstName: 'Justin',
          lastName: 'Sanchez',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          firstName: 'Tyrion',
          lastName: 'Lannister',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          firstName: 'Rhaegar',
          lastName: 'Targaryen',
          hashedPassword: bcrypt.hashSync('password3')
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      {
        username: {
          [Op.in]: [
            'Demo_User',
            'Demo-lition',
            'FakeUser1',
            'FakeUser2'
          ]
        }
      }, {});
  }
};
