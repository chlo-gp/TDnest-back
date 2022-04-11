import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  id: number;

  @Prop()
  price: number;

  @Prop()
  artist: string;

}

export const productSchema = SchemaFactory.createForClass(Product);