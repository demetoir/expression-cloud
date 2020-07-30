import { Controller } from '@nestjs/common';
import { UserCRUDService } from './userCRUD.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../../common/model/entity/user.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

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
// create, update, replace(partial_update)dto 를 따로 주입해야한다
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
}
