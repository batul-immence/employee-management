import * as moment from 'moment'
import * as fs from 'fs'
import { JwtService } from '@nestjs/jwt'
import { rolePermission, permission } from 'src/database/database.providers'

export const isPermitted = async (decodeToken: any, permit: string) => {
  const getPermit = await rolePermission.findOne({
    where: { role: decodeToken.role },
  })

  if (!getPermit?.dataValues?.permissions.includes(permit)) {
    return false
  } else {
    return true
  }
}
