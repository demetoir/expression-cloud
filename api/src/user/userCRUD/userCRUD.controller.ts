import { Body, Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import {
	Crud,
	CrudController,
	CrudRequest,
	GetManyDefaultResponse,
	Override,
	ParsedRequest,
} from '@nestjsx/crud';
import { UserEntity } from '../../common/model/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/userCreate.dto';
import { DTOTransformPipe } from '../../common/pipe/dtoTransform.pipe';
import { UserReplaceDto } from './dto/userReplace.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { BulkDtoTransformPipe } from '../../common/pipe/bulkDtoTransform.pipe';
import { UserCreateBulkDto } from './dto/userCreateBulk.dto';
import { ApiGetManyResponse } from '../../common/libs/nestjsCRUDswaggerToolkit/CRUDdecorator/apiGetManyResponse.decorator';
import {
	ApiCreateManyResponse,
	ApiCreateOneResponse,
	ApiDeleteOneResponse,
	ApiGetOneResponse,
	ApiReplaceOneResponse,
	ApiUpdateOneResponse,
} from '../../common/libs/nestjsCRUDswaggerToolkit';

// TODO implement and test user controller

// @ApiHeader({
// 	name: 'X-MyHeader',
// 	description: 'Custom header',
// })
const dtoTransformPipe = new DTOTransformPipe(UserUpdateDto);
const bulkDtoTransformPipe = new BulkDtoTransformPipe(UserCreateBulkDto);

declare type GetManyResponse<T> =
	| GetManyDefaultResponse<UserEntity>
	| UserEntity[];

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

	routes: {
		// getOneBase: {
		// 	decorators: [ApiGetOneResponse()],
		// },
		// // getManyBase: {
		// // 	decorators: [ApiGetManyResponse({ type: UserEntity })],
		// // },
		// createOneBase: {
		// 	decorators: [ApiCreateOneResponse()],
		// },
		// createManyBase: {
		// 	decorators: [ApiCreateManyResponse()],
		// },
		// replaceOneBase: {
		// 	decorators: [ApiReplaceOneResponse()],
		// },
		// updateOneBase: {
		// 	decorators: [ApiUpdateOneResponse()],
		// },
		// deleteOneBase: {
		// 	decorators: [ApiDeleteOneResponse()],
		// },
	},
})
@Controller('/v1/users')
export class UserCRUDController implements CrudController<UserEntity> {
	constructor(public readonly service: UserCRUDService) {}

	protected get base(): CrudController<UserEntity> {
		return this;
	}

	@ApiGetManyResponse({ type: UserEntity })
	@Override('getManyBase')
	async getMany(
		@ParsedRequest() req: CrudRequest,
	): Promise<GetManyResponse<UserEntity>> {
		return this.base.getManyBase(req);
	}

	@Override()
	public async getOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity> {
		return this.base.getOneBase(req);
	}

	@Override()
	public async createOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserCreateDto,
	): Promise<UserEntity> {
		return this.base.createOneBase(req, dto.toEntity());
	}

	@Override()
	public async createMany(
		@ParsedRequest() req: CrudRequest,
		@Body(bulkDtoTransformPipe)
		dto: UserCreateBulkDto,
	): Promise<UserEntity[]> {
		return this.base.createManyBase(req, dto.toEntity());
	}

	@Override()
	public async updateOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserUpdateDto,
	): Promise<UserEntity> {
		return this.base.updateOneBase(req, dto.toEntity());
	}

	@Override()
	public async replaceOne(
		@ParsedRequest() req: CrudRequest,
		@Body(dtoTransformPipe) dto: UserReplaceDto,
	): Promise<UserEntity> {
		return this.base.replaceOneBase(req, dto.toEntity());
	}

	@Override()
	public async deleteOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity | void> {
		return this.base.deleteOneBase(req);
	}
}
