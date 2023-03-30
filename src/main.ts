import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger';
import { VALIDATION_OPTIONS } from './config/validation/validation-pipe';
import { CatchExceptionFilter } from './common/filters/catch-exceptions.filter';
import { logger } from './utils/logger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, logger });
  const configService = app.get(ConfigService);
  const PORT: number = configService.get<number>('PORT');

  app.enableCors();

  /* Validation Pipe */
  app.useGlobalPipes(new ValidationPipe(VALIDATION_OPTIONS));

  /* Error Filter */
  app.useGlobalFilters(new CatchExceptionFilter());

  /* Swagger API Docs */
  setupSwagger(app);

  await app.listen(PORT);
}
bootstrap();
