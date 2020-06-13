import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'edit_history_value_bigints' })
export class EditHistoryValueVarcharEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'value', type: 'bigint',  nullable: false })
	value: bigint;

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

	// todo add edit history  relaction one to one
}
