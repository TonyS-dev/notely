// backend/src/main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  // Enable CORS for frontend
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Used to handle serialization globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
