import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ExpressionEntity } from './expression.entity';
import { BaseEntity } from '../../base/base.entity';

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

	@OneToOne(() => ExpressionEntity, (expression) => expression.setting)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;
}
