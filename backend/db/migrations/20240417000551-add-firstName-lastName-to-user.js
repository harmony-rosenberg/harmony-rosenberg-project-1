'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('airbnb_schema.Users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'first'
    }, options)

    await queryInterface.addColumn('airbnb_schema.Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'first'
    }, options)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('airbnb_schema.Users', 'firstName', options);
    await queryInterface.removeColumn('airbnb_schema.Users', 'lastName', options);
  }
};
