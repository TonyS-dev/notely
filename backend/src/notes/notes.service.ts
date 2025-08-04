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
  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const { categoryIds, ...restOfDto } = createNoteDto;

    let categories: Category[] = [];
    if (categoryIds && categoryIds.length > 0) {
      // Find all categories that match the provided IDs and belong to the user
      categories = await this.categoriesRepository.find({
        where: {
          id: In(categoryIds),
          user: { id: userId },
        },
        relations: ['user'],
      });

      // Check if any provided category IDs were not found
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
    // Find the note to duplicate
    const noteToDuplicate = await this.findOneByIdAndOwner(id, userId);
    // Create a new note with the same properties, but without the ID
    const newNote = this.notesRepository.create({
      title: `Copy of ${noteToDuplicate.title}`,
      content: noteToDuplicate.content,
      isActive: noteToDuplicate.isActive,
      categories: noteToDuplicate.categories, // Reuse the same categories
      user: { id: userId }, // Ensure the new note belongs to the same user
    });
    // Save the new note
    return this.notesRepository.save(newNote);
  }

  // Find all active notes
  findAllActive(userId: string): Promise<Note[]> {
    // Filter notes by user ID and active status
    return this.notesRepository.find({
      where: {
        isActive: true,
        user: { id: userId },
      },
    });
  }

  // Find all archived notes
  findAllArchived(userId: string): Promise<Note[]> {
    // Filter notes by user ID and archived status
    return this.notesRepository.find({
      where: {
        isActive: false,
        user: { id: userId },
      },
    });
  }

  // Update a note, ensuring it belongs to the user
  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    // Ensure the note exists and belongs to the user
    const existingNote = await this.findOneByIdAndOwner(id, userId);

    // Handle category updates if categoryIds are provided
    if (updateNoteDto.categoryIds) {
      // Find all categories that match the provided IDs
      const categories = await this.categoriesRepository.find({
        where: { id: In(updateNoteDto.categoryIds) },
        relations: ['user'],
      });

      // Security Check: Ensure every found category belongs to the user
      for (const category of categories) {
        if (category.user.id !== userId) {
          throw new ForbiddenException(
            `Category with ID "${category.id}" does not belong to the current user.`,
          );
        }
      }

      // Update the note with the new categories
      existingNote.categories = categories;
      delete updateNoteDto.categoryIds; // Remove from DTO as it was handled it separately
    }

    // Merge the remaining properties from the DTO
    const updatedNote = this.notesRepository.merge(existingNote, updateNoteDto);

    return this.notesRepository.save(updatedNote);
  }

  // Archive a note
  async archive(id: string, userId: string): Promise<Note> {
    const note = await this.findOneByIdAndOwner(id, userId);
    note.isActive = false;
    return this.notesRepository.save(note);
  }

  // Unarchive a note
  async unarchive(id: string, userId: string): Promise<Note> {
    const note = await this.findOneByIdAndOwner(id, userId);
    note.isActive = true;
    return this.notesRepository.save(note);
  }

  // Remove a note
  async remove(id: string, userId: string): Promise<void> {
    // Use the delete method with a condition to ensure atomicity.
    const result = await this.notesRepository.delete({
      id: id,
      user: { id: userId }, // The delete operation will only succeed if both ID and userId match a row.
    });

    // If no rows were affected, it means the note wasn't found for that user.
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }

  // Private helper method to securely find a single note by its ID and owner
  private async findOneByIdAndOwner(
    noteId: string,
    userId: string,
  ): Promise<Note> {
    const note = await this.notesRepository.findOneBy({
      id: noteId,
      user: { id: userId }, // This ensures the note belongs to the user
    });

    if (!note) {
      // If no note is found, it's either the wrong ID or it doesn't belong to this user.
      // A generic "Not Found" error is thrown for security.
      throw new NotFoundException(`Note with ID "${noteId}" not found`);
    }
    return note;
  }
}
