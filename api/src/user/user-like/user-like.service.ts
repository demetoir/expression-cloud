import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserLikeEntity } from './user-like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

@Injectable()
export class UserLikeService extends TypeOrmCrudService<UserLikeEntity> {
	constructor(
		@InjectRepository(UserLikeEntity) repo: Repository<UserLikeEntity>,
	) {
		super(repo);
	}
}
