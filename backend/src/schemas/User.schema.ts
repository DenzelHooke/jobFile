import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;
export const modelName = 'User';

@Schema()
export class UserModel {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
