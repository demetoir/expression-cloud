import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Expression } from 'src/expression';

@Entity({ name: 'expression_settings' })
export class ExpressionSettingEntity extends BaseEntity {
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
