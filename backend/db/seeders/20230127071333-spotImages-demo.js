'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'https://inasianspaces.files.wordpress.com/2019/06/snk-episode-19.png?w=1200',
          preview: true
        },
        {
          spotId: 2,
          url: 'https://i.pinimg.com/originals/8d/bc/f5/8dbcf5e246fdfa6ddca7ddbdd52d12a9.jpg',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://static.wikia.nocookie.net/shingekinokyojin/images/3/39/Utgard_Castle_in_the_anime.jpg/revision/latest?cb=20170415223014',
          preview: true
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options, {
        spotId: {
          [Op.in]: [1, 2, 3]
        },
      }, {});
  }
};
