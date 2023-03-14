import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  OpenAPIObject,
} from '@nestjs/swagger';

const SWAGGER_CUSTOM_OPTIONS: SwaggerCustomOptions = {
  swaggerOptions: { persistAuthorization: true, defaultModelsExpandDepth: -1 },
};

export function setupSwagger(app: INestApplication): void {
  if (process.env.NODE_ENV === 'development') {
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle('Moae-Blog API Docs')
      .setDescription('Moae-Blog API Swagger 문서')
      .setVersion('2022')
      // @ApiBearerAuth('accessToken') => 'accessToken'을 맞춰 주어야 한다
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, SWAGGER_CUSTOM_OPTIONS);
  }
}
