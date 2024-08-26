import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// * To create a Nest applicate instance, we use the core NestFactory class. NestFactory exposes a few static methods that allow creating an application instance. The create() method returns an application object, which fulfills the INestApplication interface. This object provides a set of methods. In the main.ts example below, we simply start up our HTTP Listener, which lets the application await inbound HTTP requests.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // * Enable global validation
  app.enableCors({
    origin: ['http://localhost:4200'],
    // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(3000);
}
bootstrap();

// # VALIDATION
// * NestJS provides a built-in ValidationPipe that integrates with the class-validator and class-transformer libraries to validate incoming request data. This pipe checks that the data in the request body matches the structure and constraints defined in your DTO.
// * Applied the ValidationPipe globally, so it automatically validates all incoming requests across your entire application.
