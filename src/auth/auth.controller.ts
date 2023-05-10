import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { login_dto } from './dto/login_dto'
import { Request, Response } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Login' })
  @Post('login')
  public async logIn(
    @Req() request: Request,
    @Body() logIn: login_dto,
    @Res() response: Response
  ): Promise<any> {
    // const joiReturn = validation(logIn, 'logIn');
    // if (joiReturn.error) {
    //     const joiResult: any = await generateValidationResponse(joiReturn);
    //     response.status(joiResult.code).send({ ...joiResult });
    //     return joiResult;
    // }

    return this.authService.logIn(logIn, response)
  }
}
