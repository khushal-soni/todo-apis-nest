import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: false, default: '' })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop({ required: true, default: false })
  trashed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
