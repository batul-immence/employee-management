import { ApiProperty } from '@nestjs/swagger'

export class create_role_dto {
  @ApiProperty()
  role: string
}
