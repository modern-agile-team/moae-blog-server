import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger';
import { VALIDATION_OPTIONS } from './config/validation/validation-pipe';
import { PrismaKnownFilter } from './common/filters/prisma-known.filter';
import { PrismaUnKnownFilter } from './common/filters/prisma-known.filter copy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger: Logger = new Logger();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.enableCors();

  /* Validation Pipe */
  app.useGlobalPipes(new ValidationPipe(VALIDATION_OPTIONS));
  app.useGlobalFilters(
    new PrismaKnownFilter(logger),
    new PrismaUnKnownFilter(logger),
  );

  /* Swagger API Docs */
  setupSwagger(app);

  await app.listen(PORT);
  logger.log(`Start Run: ${PORT}`);
}
bootstrap();
