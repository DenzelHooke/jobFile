import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import User from './interfaces/users.interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
