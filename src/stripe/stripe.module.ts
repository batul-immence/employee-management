import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { StripeController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { HttpModule, HttpService } from '@nestjs/axios'

@Module({
  imports: [JwtModule, HttpModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
