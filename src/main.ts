import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as xss from 'xss-clean';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();
  app.use(helmet());
  app.use(xss());

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription(
      'API documentation for managing todos and user authentication',
    )
    .setVersion('1.0')
    .addTag('auth')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
