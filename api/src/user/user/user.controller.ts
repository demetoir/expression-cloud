import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
	CrudController,
	CrudRequest,
	Override,
	ParsedRequest,
} from '@nestjsx/crud';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { logger } from 'src/common/libs/winstonToolkit';
import {
	UserCreateBulkDto,
	UserCreateDto,
	UserReplaceDto,
	UserUpdateDto,
} from 'src/user/user/dto';
import { CrudPlus, getManyResponse } from 'src/common/libs/nestjsCRUDToolkit';
import { dtoTransformPipe } from './pipe/userDtoTransfrom.pipe';
import { userBulkDtoTransformPipe } from './pipe/userBulkDtoTransform.pipe';

// TODO implement and test user controller

@ApiTags('User')
@CrudPlus({
	model: {
		type: UserEntity,
	},
	dto: {
		create: UserCreateDto,
		replace: UserReplaceDto,
		update: UserUpdateDto,
	},
})
@Controller('/v1/users')
export class UserController implements CrudController<UserEntity> {
	private logger: any;

	constructor(public readonly service: UserService) {
		this.logger = logger;
	}

	get base(): CrudController<UserEntity> {
		return this;
	}

	@ApiOperation({
		description: 'description',
		summary: 'summary',
	})
	@Override('getManyBase')
	public async getMany(
		@ParsedRequest() req: CrudRequest,
	): Promise<getManyResponse<UserEntity>> {
		return this.base.getManyBase(req);
	}

	@Override('getOneBase')
	public async getOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity> {
		return this.base.getOneBase(req);
	}

	@Override('createManyBase')
	public async createMany(
		@ParsedRequest() req: CrudRequest,
		@Body(userBulkDtoTransformPipe)
		dto: UserCreateBulkDto,
	): Promise<UserEntity[]> {
		return this.base.createManyBase(req, dto.toEntity());
	}

	@Override('createOneBase')
	public async createOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserCreateDto,
	): Promise<UserEntity> {
		return this.base.createOneBase(req, dto.toEntity());
	}

	@Override('updateOneBase')
	public async updateOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserUpdateDto,
	): Promise<UserEntity> {
		return this.base.updateOneBase(req, dto.toEntity());
	}

	@Override('replaceOneBase')
	public async replaceOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserReplaceDto,
	): Promise<UserEntity> {
		return this.base.replaceOneBase(req, dto.toEntity());
	}

	@Override('deleteOneBase')
	public async deleteOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity | void> {
		return this.base.deleteOneBase(req);
	}
}
