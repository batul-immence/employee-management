import { Sequelize } from 'sequelize-typescript'
import { Json } from './../../node_modules/sequelize/types/utils.d'

export const paymentHistoryModel = (sequelize: Sequelize, Sequelize) => {
  const paymentHistory = sequelize.define(
    'payment-history',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      payment_id: Sequelize.STRING(225),
      customer_id: Sequelize.STRING(225),
      empId: Sequelize.INTEGER,
      customer_name: Sequelize.STRING(45),
      order_id: Sequelize.STRING(225),
      payment_date: Sequelize.DATE,
      payment_amount: Sequelize.INTEGER,
      payment_method: Sequelize.STRING(225),
      payment_status: Sequelize.TEXT,
      client_secret: Sequelize.STRING(225),
      currency: Sequelize.STRING(225),
      card_details: Sequelize.JSON,
      payment_gateway: Sequelize.STRING(20),
      isActive: {
        type: Sequelize.ENUM(0, 1),
        defaultValue: 1,
        comment: '0-NO, 1-YES',
      },
    },
    {
      tableName: 'payment-history',
      paranoid: true,
    }
  )
  return paymentHistory
}
