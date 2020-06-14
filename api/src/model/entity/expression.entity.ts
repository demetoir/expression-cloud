import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';
import { ColumnEntity } from './column.entity';
import { columns1591519634701 } from '../migration/1591519634701-columns';

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


	// todo add test this relation
	@OneToMany(
		type => ColumnEntity,
		column => column.expression,
	)
	columns: ColumnEntity[];
}
