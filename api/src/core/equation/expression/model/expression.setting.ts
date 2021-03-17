import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdColumn,
	IdField,
	UpdatedAtColumn,
} from '../../../../common';

@Entity({ name: 'expression_settings' })
export class ExpressionSetting {
	@IdField()
	@IdColumn()
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
