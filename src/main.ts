import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger';
import { VALIDATION_OPTIONS } from './config/validation/validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger: Logger = new Logger();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.enableCors();

  /* Validation Pipe */
  app.useGlobalPipes(new ValidationPipe(VALIDATION_OPTIONS));

  /* Swagger API Docs */
  setupSwagger(app);

  await app.listen(PORT);
  logger.log(`Start Run: ${PORT}`);
}
bootstrap();
