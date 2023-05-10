import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RolePermissionController } from './role-permission.controller'
import { RolePermissionService } from './role-permission.service'

@Module({
  imports: [JwtModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
