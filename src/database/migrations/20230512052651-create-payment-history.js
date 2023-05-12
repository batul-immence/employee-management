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
    await queryInterface.createTable('payment-history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      payment_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      payment_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      payment_status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      client_secret: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      card_details: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      payment_gateway: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Stripe',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
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
