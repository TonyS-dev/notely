// backend/src/main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  // Enable CORS for all origins
  app.enableCors();
  // Used to handle serialization globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
