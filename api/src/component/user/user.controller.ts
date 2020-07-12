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

	@Patch('/:id')
	async updateUserPartial() {
		return 'patch user';
	}

	@Delete('/:id')
	async deleteUser(@Param() params): Promise<string> {
		const { id } = params;

		console.log(id);
		return 'delete user';
	}

	@Post('/:id/actions/like')
	async likeUser(): Promise<string> {
		return 'like user';
	}

	@Post('/:id/actions/undo-like')
	async undoLikeUser(): Promise<string> {
		return 'like user';
	}

	@Get('/:id/setting')
	async getUserSetting() {
		return 'get user setting';
	}

	@Put('/:id/setting')
	async updateUserSetting() {
		return 'put user setting';
	}

	@Patch('/:id/setting')
	async updateUserSettingPartial() {
		return 'patch user setting';
	}
}
