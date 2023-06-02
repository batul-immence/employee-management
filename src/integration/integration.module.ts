import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { IntegrationController } from './integration.controller'
import { IntegrationService } from './integration.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class IntegrationModule {}
