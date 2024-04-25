'use strict';

const { Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
    {
      spotId: 2,
      userId: 11,
      startDate: '2024-04-27',
      endDate: '2024-04-29'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      spotId: 2,
      userId: 11,
      startDate: '2024-04-27',
      endDate: '2024-04-29'
    })
  }
};
