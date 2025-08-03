// backend/src/notes/dto/update-note.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

// This DTO is used to update a note, inheriting properties from CreateNoteDto
export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
