'use strict';

const { Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 2,
      startDate: '2024-04-27',
      endDate: '2024-04-29'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      spotId: 1,
      userId: 2,
      startDate: '2024-04-27',
      endDate: '2024-04-29'
    })
  }
};
