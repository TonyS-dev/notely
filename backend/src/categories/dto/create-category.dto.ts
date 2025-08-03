// backend/src/categories/dto/create-category.dto.ts
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
