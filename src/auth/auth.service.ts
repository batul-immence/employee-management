import { HttpStatus, Injectable } from '@nestjs/common'
import { employee } from 'src/database/database.providers'
import { login_dto } from './dto/login_dto'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async logIn(logIn: login_dto, response: Response): Promise<any> {
    const getLogIn = await employee.findOne({
      where: [{ companyEmail: logIn.email }, { isActive: 1 }],
    })
    if (getLogIn) {
      if (getLogIn.dataValues?.designation !== 0) {
        const checkPassword = bcrypt.compareSync(
          logIn.password.toString(),
          getLogIn.dataValues?.password
        )

        if (checkPassword) {
          const payload = {
            id: getLogIn.dataValues?.id,
            companyEmail: getLogIn.dataValues?.companyEmail,
            role: getLogIn.dataValues?.designation,
          }
          const token = this.jwtService.sign(payload)
          return response.send({
            isSuccess: true,
            message: 'Login successful',
            code: HttpStatus.OK,
            data: { token: token },
          })
        } else {
          return response.send({
            isSuccess: false,
            message: 'Password invalid',
            code: 500,
            data: {},
          })
        }
      } else {
        if (logIn.password.toString() === getLogIn.dataValues?.password) {
          const payload = {
            id: getLogIn.dataValues?.id,
            companyEmail: getLogIn.dataValues?.companyEmail,
            role: getLogIn.dataValues?.designation,
          }
          console.log(payload)
          const token = this.jwtService.sign(payload)
          console.log(token)
          return response.send({
            isSuccess: true,
            message: 'Welcome root user.',
            code: HttpStatus.OK,
            data: { token: token },
          })
        } else {
          return response.send({
            isSuccess: false,
            message: 'Password invalid',
            code: 500,
            data: {},
          })
        }
      }
    } else {
      return response.send({
        isSuccess: false,
        message: 'No such Email address exists.',
        code: HttpStatus.OK,
        data: {},
      })
    }
  }
}
