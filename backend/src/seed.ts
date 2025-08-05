import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { NotesService } from './notes/notes.service';
import { CategoriesService } from './categories/categories.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const notesService = app.get(NotesService);
  const categoriesService = app.get(CategoriesService);

  // Check if the default user exists
  const existingUser = await usersService.findOneByEmail('tony@mail.com');

  if (!existingUser) {
    const user = await usersService.create({
      email: 'tonys-dev@mail.com',
      username: 'TonyS-dev',
      password: 'password123',
    });

    const cat1 = await categoriesService.create({ name: 'Work' }, user.id);
    const cat2 = await categoriesService.create({ name: 'Personal' }, user.id);

    await notesService.create(
      {
        title: 'Sample Note',
        content: 'This is a sample note.',
        categoryIds: [cat1.id, cat2.id],
      },
      user.id,
    );
  }

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
