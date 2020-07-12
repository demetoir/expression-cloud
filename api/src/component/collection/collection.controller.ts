import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../../libs/winstonToolkit';

@Controller('collections')
export class CollectionController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getMany() {
		return 'get many collection';
	}

	@Post('/')
	async createOne() {
		return 'create collection';
	}

	@Get('/:id')
	async getOne() {
		return 'get collection';
	}

	@Put('/:id')
	async updateOne() {
		return 'update collection';
	}

	@Patch('/:id')
	async updateOnePartial() {
		return 'update collection partial';
	}

	@Delete('/:id')
	async deleteOne() {
		return 'delete collection partial';
	}
}
