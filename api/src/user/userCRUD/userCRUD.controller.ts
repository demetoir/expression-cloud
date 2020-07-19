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
import { UserCRUDService } from './userCRUD.service';

// TODO implement and test user controller
@Controller('users')
export class UserCRUDController {
	private logger: any;
	private userCRUDService: UserCRUDService;

	constructor(userCRUDService: UserCRUDService) {
		this.userCRUDService = userCRUDService;
		this.logger = logger;
	}

	@Get('/')
	async getMany(@Query() queries: any): Promise<any> {
		return this.userCRUDService.getMany(queries);
	}

	@Get('/:id')
	async getOne(@Param() params: any, @Query() queries: any): Promise<any> {
		const { id } = params;

		return this.userCRUDService.getOne(id, queries);
	}

	@Post('/')
	async createOne(@Body() body): Promise<any> {
		return this.userCRUDService.createOne(body);
	}

	@Put('/:id')
	async updateOne(@Param() params, @Body() body): Promise<any> {
		const { id } = params;

		return this.userCRUDService.updateOne(id, body);
	}

	@Patch('/:id')
	async updateOnePartial(@Param() params, @Body() body): Promise<any> {
		const { id } = params;
		return this.userCRUDService.updateOnePartial(id, body);
	}

	@Delete('/:id')
	async deleteOne(@Param() params): Promise<any> {
		const { id } = params;

		return this.userCRUDService.deleteOne(id);
	}
}
