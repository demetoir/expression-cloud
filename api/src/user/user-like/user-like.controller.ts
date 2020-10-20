import {
	Body,
	Controller,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudPlus, getManyResponse } from 'src/common/libs/nestjsCRUDToolkit';
import { UserLikeService } from './user-like.service';
import { UserLikeEntity } from './user-like.entity';
import { UserLikeCreateDto } from './dto/user-like-create.dto';
import {
	CrudController,
	CrudRequest,
	Override,
	ParsedRequest,
} from '@nestjsx/crud';
import { DatabaseQueryFailFilter } from 'src/common/filter/database-query-fail-error.filter';
import { plainToClass } from 'class-transformer';
import { QueryFailedError } from 'typeorm';
import { MysqlErrorCodes } from 'mysql-error-codes';
import { DatabaseConstraintFailError } from 'src/common/error/database-constraint-fail.error';

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
@UseFilters(new DatabaseQueryFailFilter())
@UsePipes(new ValidationPipe({ transform: true }))
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
		@Body() dto: UserLikeCreateDto,
	): Promise<UserLikeEntity> {
		const entity: UserLikeEntity = plainToClass(UserLikeEntity, dto);

		try {
			return await this.base.createOneBase(req, entity);
		} catch (e) {
			if (e instanceof QueryFailedError) {
				const errno = e['errno'];

				// todo: 여기 에러 핸들링 부분 아키텍쳐좀 개선하기
				// case of constraint error
				if (errno === MysqlErrorCodes.ER_NO_REFERENCED_ROW_2) {
					throw new DatabaseConstraintFailError(e);
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
