import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/User.dto';
import User from './interfaces/users.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, modelName } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(modelName) readonly userModel: Model<UserModel>) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({email: email});
  }

  async findByID(id: string): Promise<User | null> {
    return await this.userModel.findById({ _id: id });
  }

  async createPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    
    return bcrypt.hash(password, salt)
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
      password: await this.createPassword(createUserDto.password)
    });

    return await newUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
