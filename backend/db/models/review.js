'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'userId'})
      Review.belongsTo(models.Spot, {as: 'rating', foreignKey: 'spotId'})
      Review.hasMany(models.reviewImage, {foreignKey: 'reviewId'})
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    stars: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true
      },
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
