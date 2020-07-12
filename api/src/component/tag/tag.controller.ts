import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../../libs/winstonToolkit';

@Controller('tags')
export class TagController {
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

	@Patch('/')
	async updateOnePartial() {
		return;
	}

	@Delete('/')
	async deleteOne() {
		return;
	}
}
