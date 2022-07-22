/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const options = new DocumentBuilder()
    .setTitle('swagger')
    .setDescription('ToDo API List')
    .setVersion('5.0.9')
    .addBearerAuth()
    .build();

  const app = await NestFactory.create(AppModule,{ cors: {
      origin: true,
      preflightContinue: false,
    } });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}

bootstrap();
