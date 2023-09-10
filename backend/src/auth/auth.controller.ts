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
import Auth from './interfaces/auth.interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<Auth | null> {
    console.log(createUserDto)
    return this.authService.register(createUserDto);
  }

  @Post('login')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<Auth | null> {
    console.log(loginUserDto)
    return this.authService.signIn(loginUserDto);
  }
}
