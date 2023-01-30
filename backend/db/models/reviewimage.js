'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(
        models.Review,
        {
          foreignKey: 'reviewId'
        }
      );
    }
  }
  ReviewImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // onDelete: 'CASCADE',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
