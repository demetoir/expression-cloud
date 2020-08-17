import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenPayload } from './token-payload';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(TokenPayload.name)
		private tokenPayloadModel: Model<TokenPayload>,
	) {}

	async createOne(dto: any): Promise<TokenPayload> {
		const createdCat = new this.tokenPayloadModel(dto);
		return createdCat.save();
	}

	async deleteOne(tokenUuid) {}

	async findOne(tokenUuid) {}
}
