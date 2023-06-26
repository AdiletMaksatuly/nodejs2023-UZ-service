import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogService } from './services/log.service';
import { ConfigModule } from '@nestjs/config';
import logConfig from './config/log.config';
import { LogMiddleware } from './middlewares/log.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [logConfig],
    }),
  ],
  providers: [LogService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
