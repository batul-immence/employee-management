import { create_role_permission_dto } from './dto/create_role_permission_dto'
import { update_role_permission_dto } from './dto/update_role_permission_dto'
import { HttpStatus, Injectable } from '@nestjs/common'
import { rolePermission } from 'src/database/database.providers'
import { Response } from 'express'

@Injectable()
export class RolePermissionService {
  async createRolePermission(
    createRolePermission: create_role_permission_dto,
    response: Response
  ): Promise<any> {
    const { count, rows } = await rolePermission.findAndCountAll({
      where: {
        role: createRolePermission.role,
      },
    })
    if (count >= 1) {
      throw response.send({
        isSuccess: false,
        message: 'Permissions for this role already exists',
        code: HttpStatus.OK,
        data: {},
      })
    }
    const rolePCreate = await rolePermission.create({
      role: createRolePermission.role,
      permissions: createRolePermission.permissions,
    })
    if (rolePCreate) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { rolePCreate },
      })
    }
    throw response.send({
      isSuccess: false,
      message: 'Failed to create the entry',
      code: 500,
      data: {},
    })
  }

  async updateRolePermission(
    role: number,
    updateRolePermission: update_role_permission_dto,
    response: Response
  ): Promise<any> {
    try {
      const rolePUpdate = await rolePermission.update(
        { permissions: updateRolePermission.permissions },
        {
          where: {
            role: role,
          },
        }
      )
      if (rolePUpdate) {
        throw response.send({
          isSuccess: true,
          message: 'Success',
          code: HttpStatus.OK,
          data: { rolePUpdate },
        })
      }
      throw response.send({
        isSuccess: false,
        message: 'Failed to create the entry',
        code: 500,
        data: {},
      })
    } catch {
      throw response.send({
        isSuccess: false,
        message: 'Not such role exists',
        code: 500,
        data: {},
      })
    }
  }

  async getRolePermission(response: Response): Promise<any> {
    const RolePModel = await rolePermission.findAll({})
    if (RolePModel.length > 0) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { RolePModel },
      })
    }
    return response.send({
      isSuccess: false,
      message: 'No permissions of the roles found',
      code: 404,
      data: {},
    })
  }

  async deleteRolePermission(id: number, response: Response): Promise<any> {
    const rolePIsActive = await rolePermission.update(
      {
        isActive: 0,
      },
      {
        where: { id: id },
      }
    )
    if (!rolePIsActive[0]) {
      return response.send({
        isSuccess: true,
        message: 'No such role-permission existed',
        code: 404,
        data: {},
      })
    }
    const rolePDelete = await rolePermission.destroy({
      where: { id: id },
    })
    if (rolePDelete) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { rolePDelete },
      })
    }
    throw response.send({
      isSuccess: true,
      message: 'Failed to delete this entry',
      code: 400,
      data: {},
    })
  }
}
