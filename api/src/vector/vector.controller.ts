import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('vectors')
export class VectorController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getMany() {
		return;
	}

	@Post('/')
	async createOne() {
		return;
	}

	@Get('/:id')
	async getOne() {
		return;
	}

	@Put('/:id')
	async updateOne() {
		return;
	}

	@Patch('/:id')
	async updateOnePartial() {
		return;
	}

	@Delete('/:id')
	async deleteOne() {
		return;
	}
}
