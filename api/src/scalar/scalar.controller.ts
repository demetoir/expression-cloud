import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('scalars')
export class ScalarController {
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
	async updatePartialOne() {
		return;
	}

	@Delete('/:id')
	async deleteOne() {
		return;
	}
}
