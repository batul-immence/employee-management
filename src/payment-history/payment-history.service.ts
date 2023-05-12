import { HttpStatus, Injectable } from '@nestjs/common'
import { paymentHistory } from 'src/database/database.providers'
import { Response } from 'express'

@Injectable()
export class PaymentHistoryService {
  async getallPaymentList(response: Response): Promise<any> {
    const payments = await paymentHistory.findAll({})
    if (payments.length > 0) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { payments },
      })
    }
    return response.send('No payments found')
  }

  async getPaymentList(id: number, response: Response): Promise<any> {
    const payments = await paymentHistory.findAll({
      where: {
        empId: id,
      },
    })
    if (payments.length > 0) {
      return response.send({
        isSuccess: true,
        message: 'Success',
        code: HttpStatus.OK,
        data: { payments },
      })
    }
    return response.send('No payments made.')
  }
}
