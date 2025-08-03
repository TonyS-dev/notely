// backend/src/notes/notes.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Create a new note
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { userId, categoryIds, ...restOfDto } = createNoteDto;

    let categories: Category[] = [];
    if (categoryIds && categoryIds.length > 0) {
      // Find all categories that match the provided IDs
      categories = await this.categoriesRepository.find({
        where: { id: In(categoryIds) },
        relations: {
          user: true,
        },
      });

      // Security Check: Ensure every found category belongs to the user
      for (const category of categories) {
        if (category.user.id !== userId) {
          throw new ForbiddenException(
            `Category with ID "${category.id}" does not belong to the current user.`,
          );
        }
      }

      // Check if any provided category IDs were not found
      if (categories.length !== categoryIds.length) {
        throw new NotFoundException('One or more categories were not found.');
      }
    }

    const note = this.notesRepository.create({
      ...restOfDto,
      user: { id: userId },
      categories: categories, // Assign the full category objects
    });

    return this.notesRepository.save(note);
  }

  // Find all active notes
  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({ where: { isActive: true } });
  }

  // Find all archived notes
  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({ where: { isActive: false } });
  }

  // Update a note
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.preload({
      id: id,
      ...updateNoteDto,
    });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return this.notesRepository.save(note);
  }

  // Archive a note
  async archive(id: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    note.isActive = false;
    return this.notesRepository.save(note);
  }

  // Unarchive a note
  async unarchive(id: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    note.isActive = true;
    return this.notesRepository.save(note);
  }

  // Remove a note
  async remove(id: string): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }
}
