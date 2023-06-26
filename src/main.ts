import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LogService } from './core/services/log.service';
import * as process from 'process';

const initDocs = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Home library service')
    .setDescription(
      'Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);
};

const listenForUnhandledRejection = (logger: LogService) => {
  process.on('unhandledRejection', async () => {
    await logger.crash('Unhandled Rejection occured...');

    process.exit(1);
  });
};

const listenForUncaughtException = (logger: LogService) => {
  process.on('uncaughtException', async () => {
    await logger.crash('Uncaught Exception occured...');

    process.exit(1);
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const logger = new LogService(config);

  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  listenForUnhandledRejection(logger);
  listenForUncaughtException(logger);

  initDocs(app);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
