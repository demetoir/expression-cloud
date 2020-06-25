import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { logger } from '../libs/winstonToolkit';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class readDto {
	@ApiProperty()
	name: string;

	@ApiProperty({
		description: 'The age of a cat',
		minimum: 1,
		default: 1,
		type: Number,
	})
	age: number;

	@ApiProperty()
	breed: string;
}

// todo: swagger auth 설정하는거 추가
@ApiTags('hello')
@Controller()
export class AppController {
	private logger: any;

	constructor(private readonly appService: AppService) {
		this.logger = logger;
		this.logger.info('create');
	}

	@Get('/hello')
	getHello(): string {
		this.logger.info('here');
		return this.appService.getHello();
	}

	@ApiResponse({
		status: 201,
		description: 'The record has been successfully created.',
	})
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Post('/hello')
	postHello(@Body() dto: readDto, @Query() query: any): string {
		this.logger.info(`put hello ${dto} ${query}`);

		return dto.toString();
	}
}
