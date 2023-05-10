import { Sequelize } from 'sequelize-typescript'

export const employeeModel = (sequelize: Sequelize, Sequelize) => {
  const employee = sequelize.define(
    'employee',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: Sequelize.STRING(45),
      lastName: Sequelize.STRING(45),
      mobileNumber: { type: Sequelize.STRING(20), unique: true },
      companyEmail: { type: Sequelize.STRING(50), unique: true },
      designation: Sequelize.INTEGER,
      birthDate: Sequelize.DATEONLY,
      username: Sequelize.TEXT,
      password: Sequelize.TEXT,
      customerId: Sequelize.TEXT,
      isActive: {
        type: Sequelize.ENUM(0, 1),
        defaultValue: 1,
        comment: '0-NO, 1-YES',
      },
    },
    {
      tableName: 'employee',
      paranoid: true,
    }
  )
  return employee
}
