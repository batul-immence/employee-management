import { Sequelize } from 'sequelize-typescript'

export const roleModel = (sequelize: Sequelize, Sequelize) => {
  const role = sequelize.define(
    'role',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: Sequelize.STRING(45),
      isActive: {
        type: Sequelize.ENUM(0, 1),
        defaultValue: 1,
        comment: '0-NO, 1-YES',
      },
    },
    {
      tableName: 'role',
      paranoid: true,
    }
  )
  return role
}
