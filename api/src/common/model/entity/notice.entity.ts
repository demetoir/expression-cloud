import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'notice' })
export class NoticeEntity extends AbstractBaseEntity {
	@Column({ type: 'text', name: 'content', nullable: false })
	content: string;

	@Column({
		type: 'boolean',
		name: 'is_read',
		nullable: false,
		default: false,
	})
	isRead: boolean;

	@ManyToOne(() => UserEntity, (user) => user.notices, { eager: true })
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
