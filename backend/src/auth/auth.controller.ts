import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/User.dto';
import Auth from './interfaces/auth.interfaces';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { request } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST
  // Public endpoint
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Auth | null> {
    const res = await this.authService.register(createUserDto, response);

    // Sets cookie *only if* promise resolves as true (eg. no error throws)
    if (res) {
      const expiration_date = 30 * 24 * 60 * 60 * 1000;

      response.cookie('token', res?.token, {
        expires: new Date(Date.now() + expiration_date),
        httpOnly: true,
      });
    }

    return res;
  }

  // POST
  // Public endpoint
  @Post('login')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Auth | null> {
    const res = await this.authService.signIn(loginUserDto, response);

    // Sets cookie *only if* promise resolves as true (eg. no error throws)
    if (res) {
      // 1 month
      const expiration_date = 30 * 24 * 60 * 60 * 1000;

      response.cookie('token', res?.token, {
        expires: new Date(Date.now() + expiration_date),
        httpOnly: true,
      });
    }

    return res;
  }

  // GET
  // Public endpoint
  @Get('authenticate')
  async authorize(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return await this.authService.authorize(request, response);

    // response.status(200).json(res);
  }

  @Get('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const token = request.cookies['token'];
    console.log(request.cookies);

    response.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  }
}
