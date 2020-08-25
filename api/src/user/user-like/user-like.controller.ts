import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudPlus } from '../../common/libs/nestjsCRUDToolkit';
import { UserLikeService } from './user-like.service';
import { UserLikeEntity } from './user-like.entity';
import { UserLikeCreateDto } from './dto/user-like-create.dto';
import { CrudController } from '@nestjsx/crud';

@ApiTags('user-like')
@CrudPlus({
	model: {
		type: UserLikeEntity,
	},
	dto: {
		create: UserLikeCreateDto,
	},
	routes: {
		only: ['createOneBase', 'deleteOneBase', 'getManyBase'],
	},
})
@Controller('/v1/user-likes')
export class UserLikeController implements CrudController<UserLikeEntity> {
	constructor(public readonly service: UserLikeService) {}

	get base(): CrudController<UserLikeEntity> {
		return this;
	}
}
