import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('tags')
export class TagController {
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

	@Patch('/')
	async updateOnePartial() {}

	@Delete('/')
	async deleteOne() {}
}
