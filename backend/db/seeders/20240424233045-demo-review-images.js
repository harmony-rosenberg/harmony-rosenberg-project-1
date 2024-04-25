'use strict';

const { reviewImage } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await reviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviewImages', {
      reviewId: 1,
      url: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D'
    })
  }
};
