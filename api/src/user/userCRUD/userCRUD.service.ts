import { Injectable } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';

@Injectable()
export class UserCRUDService {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	async getMany() {}

	async getOne() {}

	async createOne() {}

	async updateOne() {}

	async updateOnePartial() {}

	async deleteOne() {}

	async like() {}

	async undoLike() {}
}
