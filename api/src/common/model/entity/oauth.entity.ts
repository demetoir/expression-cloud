import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'oauths' })
export class OauthEntity extends AbstractBaseEntity {
	@Column({ name: 'type', type: 'bigint', nullable: false })
	type: number;

	@Column({ name: 'authId', type: 'text', nullable: false })
	authId: string;

	@OneToOne(() => UserEntity, (user) => user.oauth)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
