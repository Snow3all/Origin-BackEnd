import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Product } from './product.schema';

import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'MEMBER' })
  role: string;

  @Prop({ ref: Product.name })
  cart: [
    {
      productId: MongooseSchema.Types.ObjectId;
      quantity: number;
    },
  ];
}
export const UserSchema = SchemaFactory.createForClass(User);
