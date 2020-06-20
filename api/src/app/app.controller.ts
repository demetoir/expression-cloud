import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { logger } from '../libs/winstonToolkit';

@Controller()
export class AppController {
	private logger: any;

	constructor(private readonly appService: AppService) {
		this.logger = logger;
		this.logger.info('create');
	}

	@Get('/')
	getHello(): string {
		this.logger.info('here');
		return this.appService.getHello();
	}
}
