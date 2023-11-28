import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/User.dto';
import User from './interfaces/users.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, modelName } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { createPassword } from '../helper/helperFuns';

@Injectable()
export class UsersService {
  constructor(@InjectModel(modelName) readonly userModel: Model<UserModel>) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email: email });
  }

  async findByID(id: string): Promise<User | null> {
    return await this.userModel.findById({ _id: id });
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
      password: await createPassword(createUserDto.password),
    });

    return await newUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
