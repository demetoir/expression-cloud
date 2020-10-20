import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserLikeEntity } from 'src/user-like/user-like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserLikeService extends TypeOrmCrudService<UserLikeEntity> {
	constructor(
		@InjectRepository(UserLikeEntity) repo: Repository<UserLikeEntity>,
	) {
		super(repo);
	}
}
