import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/User.dto';
import User from 'src/users/interfaces/users.interfaces';
import { UsersService } from 'src/users/users.service';
import Auth from './interfaces/auth.interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<Auth | null> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<Auth | null> {
    return this.authService.signIn(loginUserDto);
  }
  
}
