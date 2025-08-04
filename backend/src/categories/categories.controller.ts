// backend/src/categories/categories.controller.ts
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Request as ExpressRequest } from 'express';

// Helper interface
interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; username: string };
}

@Controller('categories') // all the routes will be prefixed with /categories
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create a new category
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(createCategoryDto, req.user.userId);
  }

  // Get all categories for the current user
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: AuthenticatedRequest) {
    return this.categoriesService.findAllForUser(req.user.userId);
  }
}
