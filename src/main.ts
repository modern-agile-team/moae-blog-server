import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  ConfigModule.forRoot({
    isGlobal: true,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.setGlobalPrefix('moae/api');

  await app.listen(process.env.PORT);
}
bootstrap();
