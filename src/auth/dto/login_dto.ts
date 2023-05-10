import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'

export class login_dto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
