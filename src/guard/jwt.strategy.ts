import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, Injectable } from '@nestjs/common'
import { employee } from 'src/database/database.providers'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'token_secret',
    })
  }

  async validate(payload: any) {
    const checkToken = await employee.findOne({
      where: { id: payload.id, isActive: 1 },
    })
    // if (!checkToken.dataValues.loginToken) {
    //   throw new HttpException('Token is expired', 401)
    // }
    return {
      id: payload.id,
      companyEmail: payload.businessEmail,
      role: payload.role,
    }
  }
}
