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
    },
    {
      spotId: 2,
      userId: 3,
      startDate: '2024-05-27',
      endDate: '2024-05-29'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2024-06-27',
      endDate: '2024-06-29'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      spotId: 1,
      userId: 2,
      startDate: '2024-04-27',
      endDate: '2024-04-29'
    },
    {
      spotId: 2,
      userId: 3,
      startDate: '2024-05-27',
      endDate: '2024-05-29'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2024-06-27',
      endDate: '2024-06-29'
    },)
  }
};
