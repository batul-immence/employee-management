// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' })
import { Sequelize } from 'sequelize-typescript'
import { employeeModel } from 'src/models/employee.model'
import { permissionModel } from 'src/models/permission.model'
import { roleModel } from 'src/models/role.model'
import { rolePermissionModel } from 'src/models/role-permission.model'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: {
    freezeTableName: true,
  },
})

export const employee = employeeModel(sequelize, Sequelize)
export const permission = permissionModel(sequelize, Sequelize)
export const role = roleModel(sequelize, Sequelize)
export const rolePermission = rolePermissionModel(sequelize, Sequelize)

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected`)
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
