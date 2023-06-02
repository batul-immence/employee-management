import { ApiProperty } from '@nestjs/swagger'
import { ChatId } from '@open-wa/wa-automate'

export class whatsapp_send_message {
  @ApiProperty()
  phoneNumber: ChatId

  @ApiProperty()
  message: string
}
