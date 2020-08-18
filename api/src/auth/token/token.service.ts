import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDocument } from './token.document';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(TokenDocument.name)
		private tokenPayloadModel: Model<TokenDocument>,
	) {}

	async createOne(dto: any): Promise<TokenDocument> {
		const createdCat = new this.tokenPayloadModel(dto);
		return createdCat.save();
	}

	async deleteOne(tokenUuid) {}

	async findOne(tokenUuid) {}
}
