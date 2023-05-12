import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common'
import { PaymentHistoryService } from './payment-history.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { isPermitted } from 'src/utils/helper'

@ApiTags('Payment History')
@Controller('payment-history')
export class PaymentHistoryController {
  constructor(
    private readonly paymentHistoryService: PaymentHistoryService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'List of all payment history' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('allPaymentList')
  public async getEmployee(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    const isPermit = await isPermitted(decode, 'payment-history')
    if (isPermit) {
      return this.paymentHistoryService.getallPaymentList(response)
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
  @ApiOperation({ summary: 'List of payment history' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('paymentList')
  public async getPaymentList(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    return this.paymentHistoryService.getPaymentList(decode['id'], response)
  }
}
