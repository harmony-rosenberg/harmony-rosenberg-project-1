'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    },
    {
      ownerId: 2,
      address: '4321 fake ave',
      city: 'fakeCity',
      state: 'fakeState',
      country: 'fakeCountry',
      lat: 35.7767,
      lng: 93.7970,
      name: 'fakeRanch',
      description: 'a somewhat great fake place for the purposes of a demo!',
      price: 500.00,
    },
    {
      ownerId: 3,
      address: '5000 fake blvd',
      city: 'fakeCity',
      state: 'fakeState',
      country: 'fakeCountry',
      lat: 50.7767,
      lng: 70.7970,
      name: 'fakeHouse',
      description: 'a very not great fake place for the purposes of a demo!',
      price: 50.00,
    }
   ], options, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, {
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
    },
    {
      ownerId: 2,
      address: '4321 fake ave',
      city: 'fakeCity',
      state: 'fakeState',
      country: 'fakeCountry',
      lat: 35.7767,
      lng: 93.7970,
      name: 'fakeRanch',
      description: 'a somewhat great fake place for the purposes of a demo!',
      price: 500.00,
    },
    {
      ownerId: 3,
      address: '5000 fake blvd',
      city: 'fakeCity',
      state: 'fakeState',
      country: 'fakeCountry',
      lat: 50.7767,
      lng: 70.7970,
      name: 'fakeHouse',
      description: 'a very not great fake place for the purposes of a demo!',
      price: 50.00,
    })
  }
};
