import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'; // <-- Add ValidationPipe
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; // <-- 1. Import the DTO

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // Use the DTO and a ValidationPipe for automatic validation
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
