import { HttpStatus, Injectable } from '@nestjs/common'
import { employeeModel } from '../entity/employee.entity'
import { Response } from 'express'
import { create_employee_dto } from './dto/create_employee_dto'
import { update_employee_dto } from './dto/update_employee_dto'
import { employee } from 'src/database/database.providers'
import * as bcrypt from 'bcrypt'

@Injectable()
export class EmployeeService {
  async getEmployee(response: Response): Promise<any> {
    const employeeModel = await employee.findAll({})
    if (employeeModel.length > 0) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { employeeModel },
      })
    }
    return response.send('No employees found')
  }

  async getEmployeeById(id: number, response: Response): Promise<any> {
    const employeeModel = await employee.findOne({
      where: { id: id },
    })
    if (employeeModel) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { employeeModel },
      })
    }
    return response.send('Employee not found')
  }

  async createEmployee(
    createEmployee: create_employee_dto,
    response: Response
  ): Promise<employeeModel> {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(createEmployee.password, salt)
    const employeeCreate = await employee.create({
      firstName: createEmployee.firstName,
      lastName: createEmployee.lastName,
      mobileNumber: createEmployee.mobileNumber,
      companyEmail: createEmployee.companyEmail,
      designation: createEmployee.designation,
      birthDate: createEmployee.birthDate,
      username: createEmployee.username,
      password: hashPassword,
    })
    if (employeeCreate) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { employeeCreate },
      })
    }
    throw response.send('Failed to create employee')
  }

  async updateEmployee(
    id: number,
    updateEmployee: update_employee_dto,
    response: Response
  ): Promise<employeeModel> {
    const employeeUpdate = await employee.update(
      {
        firstName: updateEmployee.firstName,
        lastName: updateEmployee.lastName,
        mobileNumber: updateEmployee.mobileNumber,
        designation: updateEmployee.designation,
        birthDate: updateEmployee.birthDate,
        username: updateEmployee.username,
      },
      {
        where: { id: id },
      }
    )
    if (employeeUpdate) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { employeeUpdate },
      })
    }
    throw response.send('Failed to create employee')
  }

  async deleteEmployee(id: number, response: Response): Promise<employeeModel> {
    const employeeIsActive = await employee.update(
      {
        isActive: 0,
      },
      {
        where: { id: id },
      }
    )
    const employeeDelete = await employee.destroy({
      where: { id: id },
    })
    if (employeeDelete) {
      throw response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { employeeDelete },
      })
    }
    throw response.send('Failed to delete employee')
  }
}
