'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options, {
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
