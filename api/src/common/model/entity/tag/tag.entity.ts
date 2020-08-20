import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExpressionEntity } from '../expression/expression.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'tags' })
export class TagEntity extends BaseEntity {
	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@ManyToOne(() => ExpressionEntity, (expression) => expression.tags)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;
}
