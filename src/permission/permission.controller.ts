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
import { create_permission_dto } from './dto/create_permission_dto'
import { PermissionService } from './permission.service'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { isPermitted } from 'src/utils/helper'

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly PermissionService: PermissionService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Create Permission' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createPermission(
    @Req() request: Request,
    @Body() createPermission: create_permission_dto,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'permission')
    if (isPermit) {
      return this.PermissionService.createPermission(createPermission, response)
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
  @ApiOperation({ summary: 'List of all permission' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getPermission(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'permission')
    if (isPermit) {
      return this.PermissionService.getPermission(response)
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
  @ApiOperation({ summary: 'Delete permission' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async deletePermission(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'permission')
    if (isPermit) {
      return this.PermissionService.deletePermission(id, response)
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
