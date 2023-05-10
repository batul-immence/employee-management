import { ApiProperty } from '@nestjs/swagger'

export class create_permission_dto {
  @ApiProperty()
  permission: string
}
