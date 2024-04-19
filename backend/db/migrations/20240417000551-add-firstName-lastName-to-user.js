'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn({
      tableName: 'Users',
      schema: 'airbnb_schema',
    }, 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'first'
    })

      await queryInterface.addColumn({
        tableName: 'Users',
        schema: 'airbnb_schema',
      }, 'lastName', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'last'
      })
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('airbnb_schema.Users', 'firstName', {options});
    // await queryInterface.removeColumn('airbnb_schema.Users', 'lastName', {options});
    await queryInterface.removeColumn({
      tableName: 'Users',
      schema: 'airbnb_schema'
    }, 'firstName');

    await queryInterface.removeColumn({
      tableName: 'Users',
      schema: 'airbnb_schema'
    }, 'lastName');
  }
};
