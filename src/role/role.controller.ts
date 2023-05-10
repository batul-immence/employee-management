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
import { create_role_dto } from './dto/create_role_dto'
import { RoleService } from './role.service'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { isPermitted } from 'src/utils/helper'

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Create Role' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createRole(
    @Req() request: Request,
    @Body() createRole: create_role_dto,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role')
    if (isPermit) {
      return this.roleService.createRole(createRole, response)
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
  @ApiOperation({ summary: 'List of all roles' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getRole(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role')
    if (isPermit) {
      return this.roleService.getRole(response)
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
  @ApiOperation({ summary: 'Delete role' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async deleteRole(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'role')
    if (isPermit) {
      return this.roleService.deleteRole(id, response)
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
