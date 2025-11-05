import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RMQ_URI: Joi.string().uri().required(),
        RMQ_BILLING_QUEUE: Joi.string().required(),
      }),
      envFilePath: 'apps/billing/.env',
    }),
    RmqModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
