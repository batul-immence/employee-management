import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PaymentHistoryController } from './payment-history.controller'
import { PaymentHistoryService } from './payment-history.service'

@Module({
  imports: [JwtModule],
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService],
})
export class PaymentHistoryModule {}
