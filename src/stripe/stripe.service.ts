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
import { employee } from 'src/database/database.providers'
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
              number: '4242424242424242',
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
          })
        }
        return response.send({ requiresAction: false, paymentIntent })
      } else {
        const paymentMethod = await this.stripe.paymentMethods.create({
          type: 'card',
          card: {
            number: '5555555555554444',
            exp_month: 12,
            exp_year: 2024,
            cvc: '123',
          },
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
