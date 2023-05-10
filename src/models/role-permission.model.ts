import { Sequelize } from 'sequelize-typescript'

export const rolePermissionModel = (sequelize: Sequelize, Sequelize) => {
  const role_permission = sequelize.define(
    'role-permission',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: Sequelize.STRING(45),
      permissions: Sequelize.JSON,
      isActive: {
        type: Sequelize.ENUM(0, 1),
        defaultValue: 1,
        comment: '0-NO, 1-YES',
      },
    },
    {
      tableName: 'role-permission',
      paranoid: true,
    }
  )
  return role_permission
}
