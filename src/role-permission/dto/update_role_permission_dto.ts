import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'

export class update_role_permission_dto {
  @ApiProperty()
  permissions: Array<string>
}
