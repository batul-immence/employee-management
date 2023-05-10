import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'

export class create_role_permission_dto {
  @ApiProperty()
  role: number

  @ApiProperty()
  permissions: Array<string>
}
