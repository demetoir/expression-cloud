import { Column, Entity } from 'typeorm';
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
} from '../../../../common';

@Entity({ name: 'expression_settings' })
export class ExpressionSetting {
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

	@Column({
		name: 'is_public',
		type: 'boolean',
		nullable: false,
		default: false,
	})
	isPublic = false;

	@Column({
		name: 'is_locked',
		type: 'boolean',
		nullable: false,
		default: false,
	})
	isLocked = false;

	// @OneToOne(() => Expression, (expression) => expression.setting)
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: Expression;
}
