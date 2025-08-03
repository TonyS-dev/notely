// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load the .env file and make it available globally
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigService available throughout the app
      envFilePath: '.env',
    }),

    // Configure TypeORM asynchronously to use the loaded .env variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here so we can use ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Should be 'false' in production, but 'true' is fine for development
      }),
      inject: [ConfigService], // Inject ConfigService into the factory
    }),

    NotesModule,

    UsersModule,

    CategoriesModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
