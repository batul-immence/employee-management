import { HttpStatus, Injectable } from '@nestjs/common'
import { create_role_dto } from './dto/create_role_dto'
import { role } from 'src/database/database.providers'
import { Response } from 'express'

@Injectable()
export class RoleService {
  async createRole(
    createRole: create_role_dto,
    response: Response
  ): Promise<any> {
    const roleCreate = await role.create({
      role: createRole.role,
    })
    if (roleCreate) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { roleCreate },
      })
    }
    throw response.send({
      isSuccess: false,
      message: 'Failed to create role',
      code: 500,
      data: {},
    })
  }

  async getRole(response: Response): Promise<any> {
    const RoleModel = await role.findAll({})
    if (RoleModel.length > 0) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { RoleModel },
      })
    }
    return response.send({
      isSuccess: false,
      message: 'No roles found',
      code: 404,
      data: {},
    })
  }

  async deleteRole(id: number, response: Response): Promise<any> {
    const roleIsActive = await role.update(
      {
        isActive: 0,
      },
      {
        where: { id: id },
      }
    )
    if (!roleIsActive[0]) {
      return response.send({
        isSuccess: true,
        message: 'No such role existed',
        code: 404,
        data: {},
      })
    }
    const roleDelete = await role.destroy({
      where: { id: id },
    })
    if (roleDelete) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { roleDelete },
      })
    }
    throw response.send({
      isSuccess: true,
      message: 'Failed to delete this role',
      code: 400,
      data: {},
    })
  }
}
