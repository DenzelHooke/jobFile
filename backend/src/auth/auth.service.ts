import { Injectable, Redirect } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/User.dto';
import Auth from './interfaces/auth.interfaces';
import { UsersService } from 'src/users/users.service';
import {
  UserExistsException,
  CredentialsNotFound,
  InvalidPassword,
} from 'src/exceptions/validation.exception';
import * as bcrypt from 'bcrypt';
import { comparePassword } from 'src/helper/helperFuns';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // POST
  // Public endpoint
  async register(
    createUserDto: CreateUserDto,
    response: Response,
  ): Promise<Auth | null> {
    // Check if a user with the provided email already exists
    const userExist = await this.usersService.findByEmail(createUserDto.email);

    // If a user with the email already exists, throw an exception
    if (userExist) {
      throw new UserExistsException('email');
    }

    // If the user doesn't exist, create a new user using the provided DTO
    const newUser = await this.usersService.createOne(createUserDto);

    // Generate a JWT token
    const payload = {
      sub: newUser.id,
      username: newUser.username,
    };

    // Return an Auth object representing the registered user
    return {
      id: newUser.id, // Assign the user's ID
      username: newUser.username, // Assign the user's username
      email: newUser.email, // Assign the user's email
      token: await this.jwtService.signAsync(payload), // Assign the user's token
    } as Auth;
  }

  // POST
  // Public endpoint
  async signIn(
    loginUserDto: LoginUserDto,
    response: Response,
  ): Promise<Auth | null> {
    // Check if user with matching email exists
    const userExists = await this.usersService.findByEmail(loginUserDto.email);

    // Throw error if user does not exist
    if (!userExists) {
      throw new CredentialsNotFound();
    }

    // Compare password with hashed password of user
    const isValid = await comparePassword(
      loginUserDto.password,
      userExists.password,
    );

    // User password not valid so throw error
    if (!isValid) {
      throw new InvalidPassword();
    }

    // Generate a JWT token
    const payload = {
      sub: userExists.id,
      username: userExists.username,
    };

    // Return an Auth object representing the registered user
    return {
      id: userExists.id, // Assign the user's ID
      username: userExists.username, // Assign the user's username
      email: userExists.email, // Assign the user's email // Assign the user's token
      token: await this.jwtService.signAsync(payload),
    } as Auth;
  }

  // GET
  // Public endpoint
  async authorize(request: Request, response: Response): Promise<Boolean> {
    try {
      console.log('COOKIES: ', request.cookies);
      const token = request.cookies['token'];

      const isValid = await this.jwtService.verifyAsync(token);

      if (!isValid) {
        throw new CredentialsNotFound();
      }
      return isValid;
    } catch (error) {
      console.log(error);

      throw new CredentialsNotFound();
    }
  }
}
