import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IntegrationService } from './integration.service'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'
import { Request, Response } from 'express'
import { whatsapp_send_message } from './dto/whatsapp_send_message'

@ApiTags('Employee')
@Controller('integration')
export class IntegrationController {
  constructor(
    private readonly integrationService: IntegrationService,
    private readonly jwtService: JwtService
  ) {}

  @Version('1')
  @Get('/webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const verifyToken = 'your-verify-token' // Replace with your actual verify token

    // Extract the query parameters from the request
    console.log(req.query)
    const hubMode = req.query['hub.mode']
    const hubVerifyToken = req.query['hub.verify_token']
    const hubChallenge = req.query['hub.challenge']
    console.log(hubVerifyToken)
    if (hubMode === 'subscribe' && hubVerifyToken === verifyToken) {
      console.log('Webhook verification successful!')
      return res.status(200).send(hubChallenge)
    } else if (req.body.object === 'page') {
      req.body.entry.forEach((entry: any) => {
        entry.messaging.forEach((event: any) => {
          if (event.message) {
            const message = event.message
            console.log('Received message:', message)
          }
        })
      })
      res.sendStatus(200)
    } else {
      console.log('Webhook verification failed.')
      res.sendStatus(403)
    }
  }

  @Version('1')
  @ApiOperation({ summary: 'Whatsapp integration' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  async sendMessage(@Body() requestBody: whatsapp_send_message) {
    const { phoneNumber, message } = requestBody
    return this.integrationService.sendMessage(phoneNumber, message)
  }

  @Version('1')
  @Get('logout')
  async logout() {
    await this.integrationService.logout()
    return { message: 'Logged out successfully' }
  }
}
