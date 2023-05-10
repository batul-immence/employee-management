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
import { EmployeeService } from './employee.service'
import { Request, Response } from 'express'
import { create_employee_dto } from './dto/create_employee_dto'
import { update_employee_dto } from './dto/update_employee_dto'
import { employeeModel } from 'src/entity/employee.entity'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { isPermitted } from 'src/utils/helper'

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Create Employee' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createEmployee(
    @Req() request: Request,
    @Body() createEmployee: create_employee_dto,
    @Res() response: Response
  ): Promise<employeeModel> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'employee')
    if (isPermit) {
      return this.employeeService.createEmployee(createEmployee, response)
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
  @ApiOperation({ summary: 'List of all employees' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getEmployee(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    return this.employeeService.getEmployee(response)
  }

  @Version('1')
  @ApiOperation({ summary: 'Employee by ID' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getEmployeeById(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    return this.employeeService.getEmployeeById(id, response)
  }

  @Version('1')
  @ApiOperation({ summary: 'Update Employee' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async updateEmployee(
    @Param('id') id: number,
    @Req() request: Request,
    @Body() updateEmployee: update_employee_dto,
    @Res() response: Response
  ): Promise<employeeModel> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'employee')
    if (isPermit) {
      return this.employeeService.updateEmployee(id, updateEmployee, response)
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
  @ApiOperation({ summary: 'Delete Employee' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async deleteEmployee(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<employeeModel> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'employee')
    if (isPermit) {
      return this.employeeService.deleteEmployee(id, response)
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
