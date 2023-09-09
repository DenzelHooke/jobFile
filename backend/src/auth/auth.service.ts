import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/User.dto';
import Auth from './interfaces/auth.interfaces';
import { UsersService } from 'src/users/users.service';
import { HttpStatus } from '@nestjs/common';
import { UserExistsException, CredentialsNotFound, InvalidPassword } from 'src/exceptions/validation.exception';
import * as bcrypt from 'bcrypt';
import { comparePassword } from 'src/helper/helperFuns';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}



  async register(createUserDto: CreateUserDto): Promise<Auth | null> {
    const userExist = await this.usersService.findByEmail(createUserDto.email);

    // User with email already exists so reject register attempt
    if (userExist) {
        throw new UserExistsException('email')
    } 

    const newUser = await this.usersService.createOne(createUserDto);

    const response:Auth = {
      id: newUser.id,
      username: newUser.username,
      token: '1234',
    };

    return response
  }

  async signIn(loginUserDto: LoginUserDto): Promise<Auth | null> {
    const userExists = await this.usersService.findByEmail(loginUserDto.email)
    
    if(!userExists) {
      throw new CredentialsNotFound()
    } 

    const isValid = await comparePassword(loginUserDto.password, userExists.password)

    if(isValid) {
      const response:Auth = {
        username: userExists.username,
        id: userExists.id,
        token: ''
      }

      return response
    } 

    throw new InvalidPassword()
  
  
  }
}
