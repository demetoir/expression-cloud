import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
