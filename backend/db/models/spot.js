'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    // async avgRating() {
    //   const reviews = await this.getReviews()
    //   let starsArr = []

    //   for (let i = 0; i < reviews.length; i++) {
    //     starsArr.push(reviews[i].stars)
    //   }

    //   let sum = 0
    //   for (let i = 0; i < starsArr.length; i++) {
    //     sum += starsArr[i]
    //   }

    //   return sum / starsArr.length

    // }
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {
          foreignKey: 'ownerId',
          // onDelete: 'CASCADE',
          // hooks: true
          // as: 'Owner',
        }
      );
      Spot.hasMany(
        models.Booking,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Spot.hasMany(
        models.Review,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // onDelete: 'CASCADE'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
