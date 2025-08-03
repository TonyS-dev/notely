// backend/src/notes/notes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
