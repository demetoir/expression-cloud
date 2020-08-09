import { Body, Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import {
	Crud,
	CrudController,
	CrudRequest,
	Override,
	ParsedRequest,
} from '@nestjsx/crud';
import { UserEntity } from '../../common/model/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { logger } from '../../common/libs/winstonToolkit';
import { UserCreateDto } from './dto/userCreate.dto';
import { GetManyDefaultResponse } from '@nestjsx/crud/lib/interfaces';
import { DTOTransformPipe } from '../../common/pipe/dtoTransform.pipe';
import { UserReplaceDto } from './dto/userReplace.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { BulkDtoTransformPipe } from '../../common/pipe/bulkDtoTransform.pipe';
import { UserCreateBulkDto } from './dto/userCreateBulk.dto';
import {
	ApiCreateManyResponse,
	ApiCreateOneResponse,
	ApiDeleteOneResponse,
	ApiReadManyResponse,
	ApiReadOneResponse,
	ApiReplaceOneResponse,
	ApiUpdateOneResponse,
} from '../../common/libs/nestjsCRUDswaggerToolkit';

// TODO implement and test user controller

// @ApiHeader({
// 	name: 'X-MyHeader',
// 	description: 'Custom header',
// })
@ApiTags('User')
// nest.js/crud 상에서 dto를 안사용하면 자동으로 entity를 request body 그대로 사용하니
// create, update, replace(partial_update)dto 를 따로 주입해야한다기
// todo: 여기 @CRUD 데코레이터의 option 설정 공부하고 예제좀 만들기
@Crud({
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

	@ApiReadManyResponse({ type: UserEntity })
	@Override('getManyBase')
	async getMany(
		@ParsedRequest() req: CrudRequest,
	): Promise<GetManyDefaultResponse<UserEntity> | UserEntity[]> {
		return this.base.getManyBase(req);
	}

	@ApiReadOneResponse({ type: UserEntity })
	@Override('getOneBase')
	async getOne(@ParsedRequest() req: CrudRequest): Promise<UserEntity> {
		return this.base.getOneBase(req);
	}

	@ApiCreateOneResponse({ type: UserEntity })
	@Override('createOneBase')
	async createOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserCreateDto)) dto: UserCreateDto,
	): Promise<UserEntity> {
		return this.base.createOneBase(req, dto.toEntity());
	}

	// @Override 데코에서 이름 지정하고 메소드명을 같이하면 오버라이딩이 되지않는다...  shit
	@ApiUpdateOneResponse({ type: UserEntity })
	@Override('updateOneBase')
	updateOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserUpdateDto)) dto: UserUpdateDto,
	): Promise<UserEntity> {
		return this.base.updateOneBase(req, dto.toEntity());
	}

	@ApiReplaceOneResponse({ type: UserEntity })
	@Override('replaceOneBase')
	replaceOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserReplaceDto)) dto: UserReplaceDto,
	): Promise<UserEntity> {
		const entity: UserEntity = dto.toEntity();

		return this.base.replaceOneBase(req, entity);
	}

	@ApiDeleteOneResponse()
	@Override('deleteOneBase')
	async deleteOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity | void> {
		return this.base.deleteOneBase(req);
	}

	@ApiCreateManyResponse({ type: UserEntity })
	@Override('createManyBase')
	async createMany(
		@ParsedRequest() req: CrudRequest,
		@Body(new BulkDtoTransformPipe(UserCreateBulkDto))
		dto: UserCreateBulkDto,
	): Promise<UserEntity[]> {
		return this.base.createManyBase(req, dto.toEntity());
	}
}
