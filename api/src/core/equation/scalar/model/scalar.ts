import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	IntColumn,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from '../../../../common';

@Entity({ name: 'scalars' })
export class Scalar {
	@IdField()
	@PkColumn()
	id: number;

	@CreatedAtField()
	@CreatedAtColumn()
	createdAt: Date;

	@UpdatedAtField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DeletedAtField()
	@DeletedAtColumn()
	deletedAt: Date;

	// todo 이거 정밀도 때문에 문제 발생가능성 있으니 테코 만들기, string 으로 바꾸든 어떻게든 해야한
	// todo 이거랑 연관된 테이블인 edit history 테이블의 값도 변경하기

	@Column({ type: 'double precision' })
	value: number;

	@IntColumn()
	index: number;

	// @ManyToOne(() => Vector, (vector) => vector.scalars)
	// @JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
	// vector: Vector;
}
