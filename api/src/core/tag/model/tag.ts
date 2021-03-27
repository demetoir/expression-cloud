import { Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	VarcharColumn,
} from '../../../common';

@Entity({ name: 'tags' })
export class Tag {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField({ nullable: true })
	@DeletedAtColumn()
	deletedAt: Date;

	@VarcharColumn()
	name: string;

	// @ManyToOne(() => ExpressionEntity, (expression) => expression.tags)
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: ExpressionEntity;
}
