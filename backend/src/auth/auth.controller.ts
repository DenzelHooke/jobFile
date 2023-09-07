import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/User.dto';
import User from 'src/users/interfaces/users.interfaces';
import { UsersService } from 'src/users/users.service';
import Auth from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createOne(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(createUserDto);
  }
}
