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
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

// Helper interface to extend Express Request with user information
interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    username: string;
  };
}

@Controller('notes') // all the routes will be prefixed with /notes
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Post('/duplicate/:id')
  duplicate(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notesService.duplicate(id, req.user.userId);
  }

  @Get('/active')
  findAllActive(@Request() req: AuthenticatedRequest) {
    return this.notesService.findAllActive(req.user.userId);
  }

  @Get('/archived')
  findAllArchived(@Request() req: AuthenticatedRequest) {
    return this.notesService.findAllArchived(req.user.userId);
  }

  @Put(':id')
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto, req.user.userId);
  }

  @Patch(':id/archive')
  archive(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notesService.archive(id, req.user.userId);
  }

  @Patch(':id/unarchive')
  unarchive(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notesService.unarchive(id, req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notesService.remove(id, req.user.userId);
  }
}
