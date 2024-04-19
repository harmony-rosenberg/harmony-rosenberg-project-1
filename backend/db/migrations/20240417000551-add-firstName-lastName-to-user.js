'use strict';

const { type } = require('os');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'first'
    }, options)

    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'first'
    }, options)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName', options);
    await queryInterface.removeColumn('Users', 'lastName', options);
  }
};
