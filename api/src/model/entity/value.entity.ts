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
import { VectorEntity } from './vector.entity';

// todo scalar 로 테이블 이름 변경
// todo scalar 로 엔티티 이름 변
@Entity({ name: 'values' })
export class ValueEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	// todo 이거 정밀도 때문에 문제 발생가능성 있으니 테코 만들기, string 으로 바꾸든 어떻게든 해야한
	// todo 이거랑 연관된 테이블인 edit history 테이블의 값도 변경하기
	@Column({ name: 'value', type: 'double precision', nullable: false })
	value: number;

	@Column({ name: 'index', type: 'int', nullable: false })
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

	@ManyToOne(() => VectorEntity, (column) => column.values)
	@JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
	column: VectorEntity;
}
