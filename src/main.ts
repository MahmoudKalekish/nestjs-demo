import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validates incoming request bodies against DTOs
  // transform: true converts payloads into DTO instances (and helps with type conversion)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown properties
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger docs at /api
  const config = new DocumentBuilder()
    .setTitle('NestJS Demo API')
    .setDescription('Authors, Books, Publishers, Genres')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
