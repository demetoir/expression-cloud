import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../../libs/winstonToolkit';

@Controller('images')
export class ImageController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	//type by user profile, expression thumbnail, team profile image

	@Get('/')
	async getMany() {
		return 'get many images';
	}

	@Post('/')
	async createOne() {
		return 'create images';
	}

	@Get('/:id')
	async getOne() {
		return 'get images';
	}

	@Put('/:id')
	async updateOne() {
		return 'update images';
	}

	@Patch('/:id')
	async updateOnePartial() {
		return 'update images partial';
	}

	@Delete('/:id')
	async deleteOne() {
		return 'delete images';
	}
}
