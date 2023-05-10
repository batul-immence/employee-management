import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Table,
} from 'sequelize-typescript'

@Table
export class employeeModel extends Model<employeeModel> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty()
  id: number

  @Column({
    type: DataType.STRING(45),
  })
  @ApiProperty()
  firstName: string

  @Column({
    type: DataType.STRING(45),
  })
  @ApiProperty()
  lastName: string

  @Column({
    type: DataType.STRING(20),
    unique: true,
  })
  @ApiProperty()
  mobileNumber: string

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  @ApiProperty()
  companyEmail: string

  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  @ApiProperty()
  designation: number

  @Column({
    type: DataType.DATE,
  })
  @ApiProperty()
  birthDate: Date

  @Column({
    type: DataType.TEXT,
  })
  @ApiProperty()
  username: string

  @Column({
    type: DataType.TEXT,
  })
  @ApiProperty()
  password: string

  @Column({
    type: DataType.TEXT,
  })
  @ApiProperty()
  customerId: string

  @Column({
    type: DataType.TINYINT,
  })
  @ApiProperty()
  isActive: number

  @CreatedAt createdAt: Date

  @UpdatedAt updatedAt: Date
}
