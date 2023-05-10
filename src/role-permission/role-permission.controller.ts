import { RolePermissionService } from './role-permission.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { create_role_permission_dto } from './dto/create_role_permission_dto'
import { Response, Request } from 'express'
import { update_role_permission_dto } from './dto/update_role_permission_dto'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { isPermitted } from 'src/utils/helper'

@ApiTags('Role Permission')
@Controller('role-permission')
export class RolePermissionController {
  constructor(
    private readonly rolePermissionService: RolePermissionService,
    private jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Create Role-Permission' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createRolePermission(
    @Req() request: Request,
    @Body() createRolePermission: create_role_permission_dto,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role-permission')
    if (isPermit) {
      return this.rolePermissionService.createRolePermission(
        createRolePermission,
        response
      )
    } else {
      throw response.send({
        isSuccess: false,
        message: 'You dont have permission to access this page',
        code: HttpStatus.BAD_REQUEST,
        data: {},
      })
    }
  }

  @Version('1')
  @ApiOperation({ summary: 'Update Permission for the role' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/:role')
  public async updateRolePermission(
    @Param('role') role: number,
    @Req() request: Request,
    @Body() updateRolePermission: update_role_permission_dto,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role-permission')
    if (isPermit) {
      return this.rolePermissionService.updateRolePermission(
        role,
        updateRolePermission,
        response
      )
    } else {
      throw response.send({
        isSuccess: false,
        message: 'You dont have permission to access this page',
        code: HttpStatus.BAD_REQUEST,
        data: {},
      })
    }
  }

  @Version('1')
  @ApiOperation({ summary: 'List of all roles with their permissions' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getRolePermission(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role-permission')
    if (isPermit) {
      return this.rolePermissionService.getRolePermission(response)
    } else {
      throw response.send({
        isSuccess: false,
        message: 'You dont have permission to access this page',
        code: HttpStatus.BAD_REQUEST,
        data: {},
      })
    }
  }

  @Version('1')
  @ApiOperation({ summary: 'Delete entry' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async deleteRolePermission(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role-permission')
    if (isPermit) {
      return this.rolePermissionService.deleteRolePermission(id, response)
    } else {
      throw response.send({
        isSuccess: false,
        message: 'You dont have permission to access this page',
        code: HttpStatus.BAD_REQUEST,
        data: {},
      })
    }
  }
}
