import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'

@Module({
  imports: [JwtModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
