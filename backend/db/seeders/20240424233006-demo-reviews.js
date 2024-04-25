'use strict';

const { Review } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 3,
        review: "very good demo spot harm! wow! fantastic work! keep it up!",
        stars: 5.0
      },
      {
        userId: 2,
        spotId: 1,
        review: "blah blah this is a review",
        stars: 5.0
      },
      {
        userId: 3,
        spotId: 2,
        review: "if all goes as planned this will be a review in the sql database!",
        stars: 5.0
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      userId: 3,
      spotId: 1,
      review: "very good demo spot harm! wow! fantastic work! keep it up!",
      stars: 5.0
    },
    {
      userId: 2,
      spotId: 1,
      review: "blah blah this is a review",
      stars: 5.0
    },
    {
      userId: 3,
      spotId: 2,
      review: "if all goes as planned this will be a review in the sql database!",
      stars: 5.0
    })
  }
};
