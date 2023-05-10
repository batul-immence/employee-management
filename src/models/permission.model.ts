import { Sequelize } from 'sequelize-typescript'

export const permissionModel = (sequelize: Sequelize, Sequelize) => {
  const permission = sequelize.define(
    'permission',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      permission: Sequelize.STRING(45),
      isActive: {
        type: Sequelize.ENUM(0, 1),
        defaultValue: 1,
        comment: '0-NO, 1-YES',
      },
    },
    {
      tableName: 'permission',
      paranoid: true,
    }
  )
  return permission
}
