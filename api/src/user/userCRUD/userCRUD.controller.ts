import { Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../../common/model/entity/user.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

// todo 각 CRUD마다 DTO class 선언하기
// todo 도메인 별 DTO class를 따로 폴더 파서 넣기

class UserCreateDto {
	@ApiProperty({
		required: true,
		default: 'name',
		example: 'name',
	})
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	isAnonymous: boolean;

	@ApiProperty()
	likedCount: number;

	@ApiProperty()
	forkedCount: number;
}

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
	},
})
@Controller('/v1/users')
export class UserCRUDController implements CrudController<UserEntity> {
	constructor(public service: UserCRUDService) {}

	// todo: 기본놈에대가 오버라이드 하는 예제 만들기
	// get base(): CrudController<UserEntity> {
	// 	return this;
	// }
	//
	// @Override()
	// getMany(@ParsedRequest() req: CrudRequest) {
	// 	return this.base.getManyBase(req);
	// }
	//
	// @Override('getOneBase')
	// getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
	// 	return this.base.getOneBase(req);
	// }
	//
	// @Override()
	// createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Hero) {
	// 	return this.base.createOneBase(req, dto);
	// }
	//
	// @Override()
	// createMany(
	// 	@ParsedRequest() req: CrudRequest,
	// 	@ParsedBody() dto: CreateManyDto<Hero>,
	// ) {
	// 	return this.base.createManyBase(req, dto);
	// }
	//
	// @Override('updateOneBase')
	// coolFunction(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Hero) {
	// 	return this.base.updateOneBase(req, dto);
	// }
	//
	// @Override('replaceOneBase')
	// awesomePUT(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Hero) {
	// 	return this.base.replaceOneBase(req, dto);
	// }
	//
	// @Override()
	// async deleteOne(@ParsedRequest() req: CrudRequest) {
	// 	return this.base.deleteOneBase(req);
	// }
}
