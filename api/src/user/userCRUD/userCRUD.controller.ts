import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';

// TODO implement and test user controller
@Controller('users')
export class UserCRUDController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getMany(): Promise<string> {
		return 'get many user';
	}

	@Get('/:id')
	async getOne(@Param() params, @Query() queries): Promise<string> {
		const { id } = params;
		console.log(queries);
		console.log(id);
		return 'get User';
	}

	@Post('/:id')
	async createOne(@Param() params, @Body() body): Promise<string> {
		const { id } = params;

		console.log(id);
		console.log(body);

		return 'create user';
	}

	@Put('/:id')
	async updateOne(@Param() params, @Body() body): Promise<string> {
		const { id } = params;

		console.log(id);

		return 'put user';
	}

	@Patch('/:id')
	async updateOnePartial() {
		return 'patch user';
	}

	@Delete('/:id')
	async deleteOne(@Param() params): Promise<string> {
		const { id } = params;

		console.log(id);
		return 'delete user';
	}
}
