'use strict';

const { Review } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 3,
        spotId: 1,
        review: "very good demo spot harm! wow! fantastic work! keep it up!",
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
    })
  }
};
