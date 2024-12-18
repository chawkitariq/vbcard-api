import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: process.env.CORS_ORIGIN
  });

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: true
    })
  );

  await app.listen(3000);
}
bootstrap();
