import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/User.dto';
import { UsersService } from './users.service';
import User from './interfaces/users.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Post('register')
  createOne(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(createUserDto);
  }
}
