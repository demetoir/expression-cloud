import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { logger } from '../../libs/winstonToolkit';

// TODO implement and test user controller
@Controller('users')
export class UserController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	async getManyUsers(): Promise<string> {
		return 'get many user';
	}

	@Get('/:id')
	async getUser(@Param() params, @Query() queries): Promise<string> {
		const { id } = params;
		console.log(queries);
		console.log(id);
		return 'get User';
	}

	@Post('/:id')
	async createUser(@Param() params, @Body() body): Promise<string> {
		const { id } = params;

		console.log(id);
		console.log(body);

		return 'create user';
	}

	@Put('/:id')
	async updateUser(@Param() params, @Body() body): Promise<string> {
		const { id } = params;

		console.log(id);

		return 'put user';
	}

	@Delete('/:id')
	async deleteUser(@Param() params): Promise<string> {
		const { id } = params;

		console.log(id);
		return 'delete user';
	}
}
