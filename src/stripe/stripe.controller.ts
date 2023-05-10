import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { create_payment_dto } from './dto/create_payment_dto'
import { StripeService } from './stripe.service'
import { PaymentIntents } from './../../node_modules/stripe/esm/resources/PaymentIntents'

@ApiTags('Payment Service')
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Payment Intent' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('paymentIntent')
  public async createPaymentIntent(
    @Req() request: Request,
    @Body() createPayment: create_payment_dto,
    @Res() response: Response
  ): Promise<any> {
    const jwtDecode = request.headers.authorization.replace('Bearer ', '')
    const decode = this.jwtService.decode(jwtDecode)
    return this.stripeService.createPaymentIntent(
      decode['id'],
      createPayment.orderId,
      createPayment.totalAmount,
      response
    )
  }

  @Version('1')
  @ApiOperation({ summary: 'Payment Intent' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('completePaymentAuth/:id')
  public async completePaymentAuth(
    @Param('id') PaymentIntentId: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    return this.stripeService.completePaymentAuth(PaymentIntentId, response)
  }
}
