import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.gaurd';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  providers: [JwtAuthGuard],
  exports: [RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
