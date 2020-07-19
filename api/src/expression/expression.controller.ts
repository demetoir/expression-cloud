import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('expressions')
export class ExpressionController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getMany() {
		return 'get many expression';
	}

	@Post('/')
	async createOne() {
		return 'create expression';
	}

	@Get('/:id')
	async getOne() {
		return 'get expression';
	}

	@Put('/:id')
	async updateOne() {
		return 'update expression';
	}

	@Patch('/:id')
	async updateOnePartial() {
		return 'update expression partial';
	}

	@Delete('/:id')
	async deleteOne() {
		return 'create expression';
	}

	@Post('/:id/actions/fork')
	async fork() {
		return '';
	}

	@Post('/:id/actions/like')
	async like() {
		return '';
	}

	@Post('/:id/actions/undo-like')
	async undoLike() {
		return '';
	}
}
