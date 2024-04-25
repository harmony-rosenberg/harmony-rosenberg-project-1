'use strict';

const { Spot } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: '1234 fake street',
      city: 'fakeCity',
      state: 'fakeState',
      country: 'fakeCountry',
      lat: 32.7767,
      lng: 96.7970,
      name: 'fakeManor',
      description: 'a really great fake place for the purposes of a demo!',
      price: 420.69,
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: 1,
      address: '1234 fake street',
      city: 'fakeCity',
      state: 'fakeState',
      country: 'fakeCountry',
      lat: 32.7767,
      lng: 96.7970,
      name: 'fakeManor',
      description: 'a really great fake place for the purposes of a demo!',
      price: 420.69,
    })
  }
};
