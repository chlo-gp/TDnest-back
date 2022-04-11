import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  id: number;
  
  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop()
  avatar: string;

}

export const userSchema = SchemaFactory.createForClass(User);