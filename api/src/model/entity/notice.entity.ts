import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'notice' })
export class NoticeEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ type: 'text', name: 'content', nullable: false })
	content: string;

	// todo 실제 타입이 boolean으로 나오도록 옵션 수정
	@Column({
		type: 'tinyint',
		width: 1,
		name: 'is_read',
		nullable: false,
		default: false,
	})
	isRead: boolean;

	@CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
	createdAt: Date;

	@UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
	updatedAt: Date;

	@DeleteDateColumn({
		type: 'datetime',
		name: 'deleted_at',
		nullable: true,
	})
	deletedAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.notices, { eager: true })
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
