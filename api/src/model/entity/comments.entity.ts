import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'comments' })
export class CommentEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'content', type: 'text', nullable: false })
	content: string;


	// todo reftype, refid nullable true 로 다른데도 변경하기
	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;

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

	// todo relation to user many to one
}
