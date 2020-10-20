import { Controller, Get, Patch, Put } from '@nestjs/common';
import { logger } from 'src/common/libs/winstonToolkit';

// TODO implement and test user controller
@Controller('users/:id/setting')
export class UserSettingController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get()
	async getOne() {
		return 'get user setting';
	}

	@Put()
	async updateOne() {
		return 'put user setting';
	}

	@Patch()
	async updateOnePartial() {
		return 'patch user setting';
	}
}
