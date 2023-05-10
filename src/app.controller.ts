import { Controller, Get, Version } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @ApiOperation({ summary: 'Home' })
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
