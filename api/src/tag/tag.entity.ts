import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/model/entity/base/base.entity';

@Entity({ name: 'tags' })
export class TagEntity extends BaseEntity {
	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	// @ManyToOne(() => ExpressionEntity, (expression) => expression.tags)
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: ExpressionEntity;
}
