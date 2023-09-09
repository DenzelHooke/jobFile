import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/User.dto';
import Auth from './interfaces/auth.interfaces';
import { UsersService } from 'src/users/users.service';
import { HttpStatus } from '@nestjs/common';
import { UserExistsException } from 'src/exceptions/validation.exception';



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
}
