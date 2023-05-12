require('dotenv').config({ path: '.env.local' })
import {
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Stripe } from 'stripe'
import * as util from 'util'
import { Response } from 'express'
import { employee, paymentHistory } from 'src/database/database.providers'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class StripeService {
  readonly stripe: Stripe
  httpService: HttpService

  constructor(readonly configService: ConfigService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
  }

  async createPaymentIntent(
    empId: number,
    orderId: string,
    totalAmount: number,
    response: Response
  ): Promise<any> {
    if (!orderId || totalAmount < 1) {
      throw new UnprocessableEntityException(
        'The payment intent could not be created'
      )
    }

    try {
      const employeeData = await employee.findOne({
        where: { id: empId },
      })
      if (employeeData.dataValues?.customerId) {
        const cardDetails = true
          ? {
              token: 'tok_in',
            }
          : {
              number: '5555555555554444',
              exp_month: 12,
              exp_year: 2024,
              cvc: '123',
            }
        const paymentMethod = await this.stripe.paymentMethods.create({
          type: 'card',
          card: cardDetails,
        })
        console.log('payment_method: ', paymentMethod)
        const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
          amount: Number(totalAmount) * 100,
          currency: 'inr',
          customer: employeeData.dataValues?.customerId,
          payment_method_types: ['card'],
          payment_method: paymentMethod.id,
          confirm: true,
          metadata: { orderId: orderId },
        }
        const paymentIntent = await this.stripe.paymentIntents.create(
          paymentIntentParams
        )
        const payment_history = await paymentHistory.create({
          payment_id: paymentIntent.id,
          customer_id: paymentIntent.customer,
          empId: employeeData.dataValues?.id,
          customer_name: `${employeeData.dataValues?.firstName} ${employeeData.dataValues?.lastName}`,
          order_id: paymentIntent.metadata.orderId,
          payment_date: paymentIntent.created,
          payment_amount: paymentIntent.amount,
          payment_method: paymentIntent.payment_method,
          payment_status: paymentIntent.status,
          client_secret: paymentIntent.client_secret,
          currency: paymentIntent.currency,
          card_details: cardDetails,
        })
        if (
          paymentIntent.status === 'requires_action' &&
          paymentIntent.next_action
        ) {
          // return response.send({
          //   requiresAction: true,
          //   nextAction: paymentIntent.next_action,
          // }
          // .redirect(paymentIntent.next_action.use_stripe_sdk['stripe_js'])
          return response.send({
            requiresAction: true,
            nextAction: paymentIntent.next_action,
            PaymentIntentId: paymentIntent.id,
            paymentIntent,
          })
        }
        return response.send({ requiresAction: false, paymentIntent })
      } else {
        const cardDetails = true
          ? {
              token: 'tok_in',
            }
          : {
              number: '5555555555554444',
              exp_month: 12,
              exp_year: 2024,
              cvc: '123',
            }
        const paymentMethod = await this.stripe.paymentMethods.create({
          type: 'card',
          card: cardDetails,
        })

        const customer = await this.stripe.customers.create({
          email: employeeData.dataValues?.companyEmail,
          name: `${employeeData.dataValues?.firstName} ${employeeData.dataValues?.lastName}`,
          phone: employeeData.dataValues?.mobileNumber,
          payment_method: paymentMethod.id,
        })
        console.log(customer)
        await employee.update(
          { customerId: customer.id },
          {
            where: { id: empId },
          }
        )

        const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
          amount: Number(totalAmount) * 100,
          currency: 'inr',
          customer: customer.id,
          payment_method_types: ['card'],
          payment_method: paymentMethod.id,
          confirm: true,
          metadata: { orderId: orderId },
        }
        const paymentIntent = await this.stripe.paymentIntents.create(
          paymentIntentParams
        )
        const payment_history = await paymentHistory.create({
          payment_id: paymentIntent.id,
          customer_id: paymentIntent.customer,
          empId: employeeData.dataValues?.id,
          customer_name: `${employeeData.dataValues?.firstName} ${employeeData.dataValues?.lastName}`,
          order_id: paymentIntent.metadata.orderId,
          payment_date: paymentIntent.created,
          payment_amount: paymentIntent.amount,
          payment_method: paymentIntent.payment_method,
          payment_status: paymentIntent.status,
          client_secret: paymentIntent.client_secret,
          currency: paymentIntent.currency,
          card_details: cardDetails,
        })
        if (
          paymentIntent.status === 'requires_action' &&
          paymentIntent.next_action
        ) {
          return response.send({
            requiresAction: true,
            nextAction: paymentIntent.next_action,
            PaymentIntentId: paymentIntent.id,
          })
        }
        return response.send({ requiresAction: false, paymentIntent })
      }
    } catch (error) {
      Logger.error(
        '[stripeService] Error creating a payment intent',
        util.inspect(error)
      )
      throw new UnprocessableEntityException(
        'The payment intent could not be created'
      )
    }
  }

  async completePaymentAuth(paymentIntentId: string, response: Response) {
    if (paymentIntentId) {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId
      )
      if (paymentIntent.status === 'succeeded') {
        const payment_history = await paymentHistory.update(
          {
            payment_status: paymentIntent.status,
          },
          {
            where: {
              payment_id: paymentIntent.id,
            },
          }
        )
        return response.send({
          isSuccess: true,
          message: 'Payment succeeded!',
          code: HttpStatus.OK,
          data: { paymentIntent },
        })
      } else {
        return response.send({
          isSuccess: false,
          message: 'Payment failed!',
          code: 401,
          error: paymentIntent.status,
        })
      }
    }
    return response.send('Payment Intent required')
  }
}
