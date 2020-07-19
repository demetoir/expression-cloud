import { Controller, Get } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('histories')
export class HistoryController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	// type by scalar, vector
	@Get('/')
	async getMany() {
		return 'get many histories';
	}

	@Get('/:id')
	async getOne() {
		return 'get history';
	}
}
