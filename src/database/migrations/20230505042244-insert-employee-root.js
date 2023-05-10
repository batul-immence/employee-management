'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert('employee', [
      {
        firstName: 'root',
        lastName: 'root',
        mobileNumber: '1234567890',
        companyEmail: 'batul.m@immence.in',
        designation: 0,
        birthDate: '2000-07-02',
        username: 'root',
        password: 'root',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
