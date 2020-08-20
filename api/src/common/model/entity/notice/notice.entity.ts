import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'notice' })
export class NoticeEntity extends BaseEntity {
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
