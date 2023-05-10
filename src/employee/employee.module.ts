import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'

@Module({
  imports: [JwtModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
