// backend/src/users/categories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Create method to add a new category
  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const newCategory = this.categoriesRepository.create({
      ...createCategoryDto,
      user: { id: userId },
    });
    return this.categoriesRepository.save(newCategory);
  }

  // Find all categories for a user
  async findAllForUser(userId: string): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: { user: { id: userId } },
    });
  }
}
