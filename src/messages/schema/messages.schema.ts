import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import * as mongoose from 'mongoose'

export type MessageDocument = Message & Document;

@Schema()
export class Message {

  @Prop()
  id: number;

  @Prop()
  content: string;

  @Prop()
  date: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  author:User;
}

export const messageSchema = SchemaFactory.createForClass(Message);