import { create, Client, Message, ChatId } from '@open-wa/wa-automate'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IntegrationService {
  private client: Client

  constructor() {
    this.initialize()
  }
  private async initialize() {
    console.log('Done')
    this.client = await create({
      sessionId: 'session1',
      sessionData: '',
      // phoneNumber: '+918200237575',
      // clientName: 'Amit Kasetiya',
      userPreferences: {
        language: 'en',
        notifications: true,
      },
    })
    console.log('Done1', this.client)

    this.client.onMessage((message: Message) => {
      // Handle incoming messages
      console.log('Received message:', message)
    })
  }

  async sendMessage(to: ChatId, message: string) {
    console.log('Sending message:', message)
    try {
      await this.client.sendText(to, message)
      return { success: true, message: 'Message sent successfully' }
    } catch (error) {
      console.error('Error sending message:', error)
      return { success: false, message: 'Failed to send message' }
    }
  }

  async logout() {
    // Log out from the same number used for the WhatsApp session
    await this.client.logout()
    // Close the client connection
    // await client.close();
  }
}
