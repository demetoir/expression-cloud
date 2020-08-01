import { Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import {
	Crud,
	CrudController,
	CrudRequest,
	Override,
	ParsedBody,
	ParsedRequest,
} from '@nestjsx/crud';
import { UserEntity } from '../../common/model/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/createUser.dto';
import { UserReplaceDto } from './dto/userReplaceDto';
import { logger } from '../../common/libs/winstonToolkit';
import { UserUpdateDto } from './dto/userUpdateDto';
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

	// // todo: 기본놈에대가 오버라이드 하는 예제 만들기
	get base(): CrudController<UserEntity> {
		return this;
	}

	@Override('getManyBase')
	getMany(@ParsedRequest() req: CrudRequest) {
		return this.base.getManyBase(req);
	}

	@Override('getOneBase')
	getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
		return this.base.getOneBase(req);
	}

	@Override('createOneBase')
	createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() body: any) {
		// todo: nest.js pipe 를 사용해서 자동으로 dto class 가 되도록 만들
		const dto: UserCreateDto = UserCreateDto.fromBody(body);
		return this.base.createOneBase(req, dto.toEntity());
	}

	//
	// @Override('updateOneBase')
	// updateOneBase(req: CrudRequest, body: any): Promise<UserEntity> {
	// 	this.logger.info(body);
	// 	this.logger.info(req);
	//
	// 	const dto: UserUpdateDto = UserUpdateDto.fromBody(body);
	// 	console.log(dto);
	//
	// 	return null;
	// 	// return this.base.updateOneBase(req, dto.toEntity());
	// }

	// @Override()
	// createMany(
	// 	@ParsedRequest() req: CrudRequest,
	// 	@ParsedBody() dto: CreateManyDto<UserCreateDto>,
	// ) {
	// 	const entityList: UserEntity[] = dto.bulk.map((x) => x.toEntity());
	// 	return this.base.createManyBase(req, entityList);
	// }

	// @Override('updateOneBase')
	// updateOneBase(
	// 	@ParsedRequest() req: CrudRequest,
	// 	@ParsedBody() body: any,
	// ): Promise<UserEntity> {
	// 	this.logger.info(body);
	// 	this.logger.info(req);
	//
	// 	const dto: UserUpdateDto = UserUpdateDto.fromBody(body);
	// 	console.log(dto);
	//
	// 	return null
	// 	// return this.base.updateOneBase(req, dto.toEntity());
	//
	// 	// return null
	// }

	// @Override('updateOneBase')
	// updateOneBase(@ParsedRequest() req: CrudRequest, @ParsedBody() body: any) {
	// 	console.log(body)
	//
	// 	// const dto: UserUpdateDto = UserUpdateDto.fromBody(body);
	// 	return this.base.updateOneBase(req, null);
	// }

	// @Override('replaceOneBase')
	// replaceOneBase(@ParsedRequest() req: CrudRequest, @ParsedBody() body: any) {
	// 	console.log(body);
	//
	// 	// console.log(req);
	// 	// console.log();
	// 	const id = req.parsed.paramsFilter[0].value;
	// 	const dto = UserReplaceDto.fromBody(body, id);
	// 	const entity: UserEntity = dto.toEntity();
	// 	console.log(entity);
	// 	return this.base.replaceOneBase(req, entity);
	// }

	//
	// @Override()
	// async deleteOne(@ParsedRequest() req: CrudRequest) {
	// 	return this.base.deleteOneBase(req);
	// }
}
