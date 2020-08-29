import {
	Body,
	Controller,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudPlus, getManyResponse } from '../../common/libs/nestjsCRUDToolkit';
import { UserLikeService } from './user-like.service';
import { UserLikeEntity } from './user-like.entity';
import { UserLikeCreateDto } from './dto/user-like-create.dto';
import {
	CrudController,
	CrudRequest,
	Override,
	ParsedRequest,
} from '@nestjsx/crud';
import { TypeormQueryFailFilter } from '../../common/filter/typeorm-query-fail-error.filter';
import { DTOTransformPipe } from '../../common/pipe/dtoTransform.pipe';
import { QueryFailedError } from 'typeorm/index';
import { DBConstraintFailError } from '../../common/error/DB-constraint-fail.error';

export const MAX_LIMIT = 20;

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
	params: {
		// will not use resource id
		id: {
			primary: true,
			disabled: true,
		},
	},
	query: {
		maxLimit: MAX_LIMIT,
	},
})
@Controller('/v1/user-likes')
export class UserLikeController implements CrudController<UserLikeEntity> {
	constructor(public readonly service: UserLikeService) {}

	get base(): CrudController<UserLikeEntity> {
		return this;
	}

	@ApiOperation({
		description: 'description',
		summary: 'summary',
	})
	@Override('getManyBase')
	public async getMany(
		@ParsedRequest() req: CrudRequest,
	): Promise<getManyResponse<UserLikeEntity>> {
		return this.base.getManyBase(req);
	}

	@Override('createOneBase')
	public async createOne(
		@ParsedRequest() req: CrudRequest,
		@Body(new DTOTransformPipe(UserLikeCreateDto)) dto: UserLikeCreateDto,
	) {
		try {
			return await this.base.createOneBase(req, dto.toEntity());
		} catch (e) {
			if (e instanceof QueryFailedError) {
				// @ts-ignore
				if (e.code === 'ER_NO_REFERENCED_ROW_2') {
					throw new DBConstraintFailError(e);
				}
			}

			throw e;
		}
	}

	@Override('deleteOneBase')
	public async deleteOne(
		@ParsedRequest() req: CrudRequest,
	): Promise<UserLikeEntity | void> {
		return this.base.deleteOneBase(req);
	}
}
