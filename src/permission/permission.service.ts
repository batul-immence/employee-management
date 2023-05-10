import { HttpStatus, Injectable } from '@nestjs/common'
import { create_permission_dto } from './dto/create_permission_dto'
import { permission } from 'src/database/database.providers'
import { Response } from 'express'

@Injectable()
export class PermissionService {
  async createPermission(
    createPermission: create_permission_dto,
    response: Response
  ): Promise<any> {
    const permissionCreate = await permission.create({
      permission: createPermission.permission,
    })
    if (permissionCreate) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { permissionCreate },
      })
    }
    throw response.send('Failed to create permission')
  }

  async getPermission(response: Response): Promise<any> {
    const PermissionModel = await permission.findAll({})
    if (PermissionModel.length > 0) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { PermissionModel },
      })
    }
    return response.send('No permissions found')
  }

  async deletePermission(id: number, response: Response): Promise<any> {
    const permissionIsActive = await permission.update(
      {
        isActive: 0,
      },
      {
        where: { id: id },
      }
    )
    if (!permissionIsActive[0]) {
      return response.send({
        isSuccess: true,
        message: 'No such permission existed',
        code: 404,
        data: {},
      })
    }
    const permissionDelete = await permission.destroy({
      where: { id: id },
    })
    if (permissionDelete) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { permissionDelete },
      })
    }
    throw response.send({
      isSuccess: true,
      message: 'Failed to delete permission',
      code: 400,
      data: {},
    })
  }
}
