import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { logger } from 'src/libs/winstonToolkit';

// TODO implement and test user controller
@Controller('users')
export class UserController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Get('/')
	getManyUsers(): string {
		return 'get many user';
	}

	@Get('/:id')
	getUser(@Param() params): string {
		const { id } = params;

		console.log(id);
		return 'get User';
	}

	@Post('/:id')
	createUser(@Param() params): string {
		const { id } = params;

		console.log(id);

		return 'create user';
	}

	@Put('/:id')
	updateUser(@Param() params): string {
		const { id } = params;

		console.log(id);

		return 'put user';
	}

	@Delete('/:id')
	deleteUser(@Param() params): string {
		const { id } = params;

		console.log(id);
		return 'delete user';
	}
}
