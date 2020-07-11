import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { UserEntity } from './user.entity';

// todo add test
@Entity({ name: 'user_likes' })
export class UserLikeEntity extends AbstractBaseEntity {
	@ManyToOne(() => UserEntity, (object) => object.likeFrom)
	@JoinColumn({ name: 'from', referencedColumnName: 'id' })
	from: UserEntity;

	@ManyToOne(() => UserEntity, (object) => object.likeTo)
	@JoinColumn({ name: 'to', referencedColumnName: 'id' })
	to: UserEntity;
}
