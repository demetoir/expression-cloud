import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('vectors')
export class VectorController {
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
	async updateOnePartial() {}

	@Delete('/:id')
	async deleteOne() {}
}
