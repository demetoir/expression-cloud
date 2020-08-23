import { IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
	@IsString()
	@Prop({ type: String, required: true })
	uuid: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
