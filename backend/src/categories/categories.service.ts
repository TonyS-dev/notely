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
  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { userId, ...rest } = createCategoryDto;
    const newCategory = this.categoriesRepository.create({
      ...rest,
      user: { id: userId }, // Create the link to the user
    });
    return this.categoriesRepository.save(newCategory);
  }
}
