'use strict';
const bcrypt = require('bcryptjs');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options,
      [
        {
          firstName: 'Demo',
          lastName: 'User',
          email: 'demo1@user.io',
          username: 'Demo_User',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          firstName: 'Justin',
          lastName: 'Sanchez',
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          firstName: 'Tyrion',
          lastName: 'Lannister',
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          firstName: 'Rhaegar',
          lastName: 'Targaryen',
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3')
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
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
