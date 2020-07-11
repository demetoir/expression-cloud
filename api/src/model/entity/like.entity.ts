import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'likes' })
export class LikeEntity extends AbstractBaseEntity {
	@ManyToOne(() => UserEntity, (user) => user.likes)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
