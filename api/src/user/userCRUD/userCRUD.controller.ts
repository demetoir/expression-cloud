import { Body, Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import { CrudController, CrudRequest, ParsedRequest } from '@nestjsx/crud';
import { UserEntity } from '../../common/model/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { logger } from '../../common/libs/winstonToolkit';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserReplaceDto } from './dto/userReplace.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserCreateBulkDto } from './dto/userCreateBulk.dto';
import { CrudPlus, getManyResponse } from '../../common/libs/nestjsCRUDToolkit';
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
export class UserCRUDController implements CrudController<UserEntity> {
	private logger: any;

	constructor(public service: UserCRUDService) {
		this.logger = logger;
	}

	get base(): CrudController<UserEntity> {
		return this;
	}

	public async getMany(
		req: CrudRequest,
	): Promise<getManyResponse<UserEntity>> {
		return this.base.getManyBase(req);
	}

	public async getOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity> {
		return this.base.getOneBase(req);
	}

	public async createMany(
		@ParsedRequest() req: CrudRequest,
		@Body(userBulkDtoTransformPipe)
		dto: UserCreateBulkDto,
	): Promise<UserEntity[]> {
		return this.base.createManyBase(req, dto.toEntity());
	}

	public async createOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserCreateDto,
	): Promise<UserEntity> {
		return this.base.createOneBase(req, dto.toEntity());
	}

	public async updateOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserUpdateDto,
	): Promise<UserEntity> {
		return this.base.updateOneBase(req, dto.toEntity());
	}

	public async replaceOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserReplaceDto,
	): Promise<UserEntity> {
		return this.base.replaceOneBase(req, dto.toEntity());
	}

	public async deleteOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity | void> {
		return this.base.deleteOneBase(req);
	}
}
