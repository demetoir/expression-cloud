import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/model/entity/base/base.entity';

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

	// @ManyToOne(() => User, (user) => user.notices, { eager: false })
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;
}
