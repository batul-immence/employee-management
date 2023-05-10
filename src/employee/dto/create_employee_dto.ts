import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { employeeModel } from '../../entity/employee.entity'

@ApiExtraModels(employeeModel)
export class create_employee_dto {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  mobileNumber: string

  @ApiProperty({
    description: 'This is employee email address',
  })
  companyEmail: string

  @ApiProperty()
  designation: number

  @ApiProperty()
  birthDate: Date

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}
