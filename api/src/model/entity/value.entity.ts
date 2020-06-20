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
import { ColumnEntity } from './column.entity';

// todo scalar 로 테이블 이름 변경
// todo scalar 로 엔티티 이름 변
@Entity({ name: 'values' })
export class ValueEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	// todo 이놈 값을 double float type으로 엔티티에서는 number로 변경
	// todo 이거랑 연관된 테이블인 edis history 테이블의 값도 변경하기
	@Column({ name: 'value', type: 'bigint', nullable: false })
	value: number;

	// todo 이놈 값을 int 로 변경
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

	@ManyToOne(() => ColumnEntity, (column) => column.values)
	@JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
	column: ColumnEntity;
}
