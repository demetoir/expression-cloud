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

@Entity({ name: 'notice' })
export class NoticeEntity {
	@PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id' })
	id: bigint;

	@Column({ type: 'varchar', length: 255, name: 'content', nullable: false })
	content: string;

	@Column({
		type: 'tinyint',
		width: 1,
		name: 'is_read',
		nullable: false,
		default: 0,
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

	@ManyToOne(
		type => UserEntity,
		user => user.notices,
		{ eager: true },
	)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
