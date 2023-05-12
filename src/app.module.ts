import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmployeeModule } from './employee/employee.module'
import { ConfigModule } from '@nestjs/config'
import { PermissionModule } from './permission/permission.module'
import { RoleModule } from './role/role.module'
import { RolePermissionModule } from './role-permission/role-permission.module'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './guard/jwt.strategy'
import { StripeModule } from './stripe/stripe.module'
import { PaymentHistoryModule } from './payment-history/payment-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
    PermissionModule,
    RoleModule,
    RolePermissionModule,
    AuthModule,
    StripeModule,
    PaymentHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
