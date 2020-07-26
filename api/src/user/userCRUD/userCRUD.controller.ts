import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';
import { UserCRUDService } from './userCRUD.service';
import { ResourceNumberId } from '../../common/decorators/resourceId.decorator';
import { Fields } from '../../common/decorators/fields.decorator';
import { Includes } from '../../common/decorators/includes.decorator';

class ResourceNotExistException extends HttpException {
	constructor(id) {
		super(
			{
				error: 'resource not exist',
				message: `user resource of id: ${id} dose not exist`,
			},
			HttpStatus.NOT_FOUND,
		);
	}
}

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
	async getOne(
		@ResourceNumberId('id') userId: number,
		@Fields() fields: string[],
		@Includes() includes: string[],
	): Promise<any> {
		const user = await this.userCRUDService.getOne(
			userId,
			fields,
			includes,
		);

		if (user === null) {
			throw new ResourceNotExistException(userId);
		}

		return user;
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
