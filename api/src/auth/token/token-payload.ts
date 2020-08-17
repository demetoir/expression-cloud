import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TokenPayload extends Document {
	@Prop({ type: String, required: true })
	userName: string;

	@Prop({ type: String, required: true })
	role: string;

	@Prop({ type: Number, required: true })
	userId: number;

	@Prop({ type: String, required: true })
	type: 'accessToken' | 'refreshToken';
	@Prop({ type: String, required: true })
	uuid: string;

	@Prop({ type: String, required: true })
	aud?: string;

	@Prop({ type: String, required: true })
	iss?: string;
	@Prop({ type: Number, required: true })
	exp?: number;

	@Prop({ type: Number, required: true })
	iat: number;

	@Prop({ type: Number, required: false })
	nbf?: number;

	@Prop({ type: String, required: true })
	sub?: string;
}

export const TokenPayloadSchema = SchemaFactory.createForClass(TokenPayload);
