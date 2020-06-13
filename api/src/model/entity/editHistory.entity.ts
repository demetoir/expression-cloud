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
import tableIdType from '../../libs/tableIdTypeResolver';
import { UserEntity } from './user.entity';
import { userInfo } from 'os';

@Entity({ name: 'edit_histories' })
export class EditHistoryEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'edit_type', type: 'bigint', nullable: false })
	edit_type: bigint;

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
		user => user.editHistory,
	)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;

	// todo add self relation prev_id to one to one
}
