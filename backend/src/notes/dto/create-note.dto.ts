import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  categoryIds?: string[];
}
