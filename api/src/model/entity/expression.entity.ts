import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'expressions' })
export class ExpressionEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'type', type: 'tinyint', nullable: false })
	type: boolean;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@Column({ name: 'content', type: 'text', nullable: false })
	description: string;

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

	// todo relation to projec
}
