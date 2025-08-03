// backend/src/notes/notes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes') // all the routes will be prefixed with /notes
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body(new ValidationPipe()) createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('/active')
  findAllActive() {
    return this.notesService.findAllActive();
  }

  @Get('/archived')
  findAllArchived() {
    return this.notesService.findAllArchived();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.notesService.archive(id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.notesService.unarchive(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
