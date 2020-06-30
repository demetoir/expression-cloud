import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ExpressionEntity } from './expression.entity';

@Entity({ name: 'expression_settings' })
export class ExpressionSettingEntity extends AbstractBaseEntity {
	// todo project setting 컬럼 추가하기
	// `is_public`   tinyint(1)         NOT NULL DEFAULT false,
	//     `is_locked`   tinyint(1)         NOT NULL DEFAULT false,
	// @Column({
	// 	name: 'is_public',
	// 	type: 'boolean',
	// 	nullable: false,
	// 	default: false,
	// })
	// isPublic = false;
	//
	// @Column({
	// 	name: 'is_locked',
	// 	type: 'boolean',
	// 	nullable: false,
	// 	default: false,
	// })
	// isLocked = false;

	@OneToOne(() => ExpressionEntity, (expression) => expression.setting)
	@JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;
}
