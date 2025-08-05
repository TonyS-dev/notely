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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

// Define a reusable interface for our paginated response
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Find all active notes with pagination
  async findAllActive(
    userId: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResult<Note>> {
    // Use default values from DTO if not provided
    const page = paginationQuery.page || 1;
    const limit = paginationQuery.limit || 9;
    const skip = (page - 1) * limit;

    const [data, total] = await this.notesRepository.findAndCount({
      where: {
        isActive: true,
        user: { id: userId },
      },
      order: { updatedAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Find all archived notes with pagination
  async findAllArchived(
    userId: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResult<Note>> {
    // Use default values from DTO if not provided
    const page = paginationQuery.page || 1;
    const limit = paginationQuery.limit || 9;
    const skip = (page - 1) * limit;

    const [data, total] = await this.notesRepository.findAndCount({
      where: {
        isActive: false,
        user: { id: userId },
      },
      order: { updatedAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Create a new note
  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const { categoryIds, ...restOfDto } = createNoteDto;
    let categories: Category[] = [];
    if (categoryIds && categoryIds.length > 0) {
      categories = await this.categoriesRepository.find({
        where: { id: In(categoryIds), user: { id: userId } },
        relations: ['user'],
      });
      if (categories.length !== categoryIds.length) {
        throw new NotFoundException(
          'One or more categories were not found or do not belong to the current user.',
        );
      }
    }
    const note = this.notesRepository.create({
      ...restOfDto,
      user: { id: userId },
      categories: categories,
    });
    return this.notesRepository.save(note);
  }

  async duplicate(id: string, userId: string): Promise<Note> {
    const noteToDuplicate = await this.findOneByIdAndOwner(id, userId);
    const newNote = this.notesRepository.create({
      title: `Copy of ${noteToDuplicate.title}`,
      content: noteToDuplicate.content,
      isActive: noteToDuplicate.isActive,
      categories: noteToDuplicate.categories,
      user: { id: userId },
    });
    return this.notesRepository.save(newNote);
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    const existingNote = await this.findOneByIdAndOwner(id, userId);
    if (updateNoteDto.categoryIds) {
      const categories = await this.categoriesRepository.find({
        where: { id: In(updateNoteDto.categoryIds) },
        relations: ['user'],
      });
      for (const category of categories) {
        if (category.user.id !== userId) {
          throw new ForbiddenException(
            `Category with ID "${category.id}" does not belong to the current user.`,
          );
        }
      }
      existingNote.categories = categories;
      delete updateNoteDto.categoryIds;
    }
    const updatedNote = this.notesRepository.merge(existingNote, updateNoteDto);
    return this.notesRepository.save(updatedNote);
  }

  async archive(id: string, userId: string): Promise<Note> {
    const note = await this.findOneByIdAndOwner(id, userId);
    note.isActive = false;
    return this.notesRepository.save(note);
  }

  async unarchive(id: string, userId: string): Promise<Note> {
    const note = await this.findOneByIdAndOwner(id, userId);
    note.isActive = true;
    return this.notesRepository.save(note);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.notesRepository.delete({
      id: id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }

  private async findOneByIdAndOwner(
    noteId: string,
    userId: string,
  ): Promise<Note> {
    const note = await this.notesRepository.findOneBy({
      id: noteId,
      user: { id: userId },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`);
    }
    return note;
  }
}
