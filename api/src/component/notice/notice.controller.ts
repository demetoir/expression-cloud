import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../../libs/winstonToolkit';

@Controller('notices')
export class NoticeController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getMany() {
		return '';
	}

	@Post('/')
	async create() {
		return '';
	}

	@Get('/:id')
	async getOne() {
		return '';
	}

	@Put('/:id')
	async updateOne() {
		return '';
	}

	@Patch('/:id')
	async updateOnePartial() {
		return '';
	}

	@Delete('/:id')
	async deleteOne() {
		return '';
	}

	@Post('/:id/actions/read')
	async read() {
		return '';
	}

	@Post('/:id/actions/undo-read')
	async undoRead() {
		return '';
	}
}
