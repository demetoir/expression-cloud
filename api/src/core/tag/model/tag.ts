import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
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

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	// @ManyToOne(() => ExpressionEntity, (expression) => expression.tags)
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: ExpressionEntity;
}
