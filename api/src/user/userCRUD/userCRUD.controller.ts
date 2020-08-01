import { Body, Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import {
	CreateManyDto,
	Crud,
	CrudController,
	CrudRequest,
	Override,
	ParsedBody,
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

	@Override('getManyBase')
	async getMany(
		@ParsedRequest() req: CrudRequest,
	): Promise<GetManyDefaultResponse<UserEntity> | UserEntity[]> {
		return this.base.getManyBase(req);
	}

	@Override('getOneBase')
	async getOne(@ParsedRequest() req: CrudRequest): Promise<UserEntity> {
		return this.base.getOneBase(req);
	}

	@Override('createOneBase')
	async createOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserCreateDto)) dto: UserCreateDto,
	): Promise<UserEntity> {
		return this.base.createOneBase(req, dto.toEntity());
	}

	// @Override 데코에서 이름 지정하고 메소드명을 같이하면 오버라이딩이 되지않는다...  shit
	@Override('updateOneBase')
	updateOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserUpdateDto)) dto: UserUpdateDto,
	): Promise<UserEntity> {
		return this.base.updateOneBase(req, dto.toEntity());
	}

	@Override('replaceOneBase')
	replaceOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserReplaceDto)) dto: UserReplaceDto,
	): Promise<UserEntity> {
		const entity: UserEntity = dto.toEntity();

		return this.base.replaceOneBase(req, entity);
	}

	@Override('deleteOneBase')
	async deleteOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserEntity | void> {
		return this.base.deleteOneBase(req);
	}

	@Override('createManyBase')
	async createMany(
		@ParsedRequest() req: CrudRequest,
		@ParsedBody() body: CreateManyDto<UserCreateDto>,
	): Promise<UserEntity[]> {
		const entityList: UserCreateDto[] = body.bulk.map((x) => {
			return UserCreateDto.fromBody(x);
		});

		const dto: CreateManyDto = {
			bulk: entityList,
		};
		return this.base.createManyBase(req, dto);
	}
}
