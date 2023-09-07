import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/User.dto';
import User from 'src/users/interfaces/users.interfaces';
import { UserModel, modelName } from 'src/schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Auth from './interfaces/auth.interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(modelName) private readonly userModel: Model<UserModel>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Auth | null> {
    const newUser = await this.usersService.findByEmail(createUserDto.email);

    if (newUser) {
      return {
        id: newUser.id,
        username: newUser.username,
        token: '1111',
      };
    }

    return null;
  }
}
