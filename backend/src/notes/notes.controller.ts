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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; username: string };
}

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/active')
  findAllActive(
    @Request() req: AuthenticatedRequest,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationQuery: PaginationQueryDto,
  ) {
    return this.notesService.findAllActive(req.user.userId, paginationQuery);
  }

  @Get('/archived')
  findAllArchived(
    @Request() req: AuthenticatedRequest,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationQuery: PaginationQueryDto,
  ) {
    return this.notesService.findAllArchived(req.user.userId, paginationQuery);
  }

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
