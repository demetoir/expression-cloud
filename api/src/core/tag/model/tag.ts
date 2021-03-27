import { Entity } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
	VarcharColumn,
} from '../../../common';

@Entity({ name: 'tags' })
export class Tag {
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

	@VarcharColumn()
	name: string;

	// @ManyToOne(() => ExpressionEntity, (expression) => expression.tags)
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: ExpressionEntity;
}
