import { Injectable } from '@nestjs/common';
import { logger } from 'src/common/libs/winstonToolkit';

@Injectable()
export class UserSettingService {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	async getOne() {}

	async updateOne() {}

	async updateOnePartial() {}
}
