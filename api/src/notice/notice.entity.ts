import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { BaseEntity } from '../common/model/entity/base/base.entity';
import { INotice } from './notice.interface';

@Entity({ name: 'notice' })
export class NoticeEntity extends BaseEntity implements INotice {
	@Column({ type: 'text', name: 'content', nullable: false })
	content: string;

	@Column({
		type: 'boolean',
		name: 'is_read',
		nullable: false,
		default: false,
	})
	isRead: boolean;

	@ManyToOne(() => UserEntity, (user) => user.notices, { eager: false })
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
