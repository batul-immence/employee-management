import { ApiProperty } from '@nestjs/swagger'

export class create_payment_dto {
  @ApiProperty()
  orderId: string

  @ApiProperty()
  totalAmount: number
}
