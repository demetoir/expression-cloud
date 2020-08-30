import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserLikeEntity } from './user-like.entity';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm/index';
import { DatabaseConstraintFailError } from '../../common/error/database-constraint-fail.error';

@Injectable()
export class UserLikeService extends TypeOrmCrudService<UserLikeEntity> {
	constructor(
		@InjectRepository(UserLikeEntity) repo: Repository<UserLikeEntity>,
	) {
		super(repo);
	}

	async getMany(
		req: CrudRequest,
	): Promise<GetManyDefaultResponse<UserLikeEntity> | UserLikeEntity[]> {
		return super.getMany(req);
	}

	async createOne(
		req: CrudRequest,
		dto: UserLikeEntity,
	): Promise<UserLikeEntity> {
		try {
			return await super.createOne(req, dto);
		} catch (e) {
			if (e instanceof QueryFailedError) {
				const errno = e['errno'];

				// todo: 여기 에러 핸들링 부분 아키텍쳐좀 개선하기
				// case of constraint error
				if (errno === 1452) {
					throw new DatabaseConstraintFailError(e);
				}
			}

			throw e;
		}
	}

	async updateOne(
		req: CrudRequest,
		dto: UserLikeEntity,
	): Promise<UserLikeEntity> {
		return super.updateOne(req, dto);
	}

	async deleteOne(req: CrudRequest): Promise<void | UserLikeEntity> {
		return super.deleteOne(req);
	}
}
