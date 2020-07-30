import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../common/model/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UserCRUDService extends TypeOrmCrudService<UserEntity> {
	constructor(@InjectRepository(UserEntity) repo) {
		super(repo);
	}
}
