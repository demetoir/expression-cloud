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
import { ExpressionEntity } from './expression.entity';

@Entity({ name: 'columns' })
export class ColumnEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({
		name: 'name',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	name: string;

	// todo 이놈은 type을 int로 바꾸기
	@Column({ name: 'index', type: 'bigint', nullable: false })
	index: number;

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

	// todo test this
	@ManyToOne(
		type => ExpressionEntity,
		expression => expression.columns,
	)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;
}
