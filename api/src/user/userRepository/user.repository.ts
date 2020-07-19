import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../../common/model/entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
