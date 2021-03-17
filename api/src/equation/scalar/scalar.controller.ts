import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';

@Controller('scalars')
export class ScalarController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getMany() {}

	@Post('/')
	async createOne() {}

	@Get('/:id')
	async getOne() {}

	@Put('/:id')
	async updateOne() {}

	@Patch('/:id')
	async updatePartialOne() {}

	@Delete('/:id')
	async deleteOne() {}
}
