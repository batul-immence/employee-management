import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
  imports: [JwtModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
