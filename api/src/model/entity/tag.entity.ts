import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ExpressionEntity } from './expression.entity';

@Entity({ name: 'tags' })
export class TagEntity extends AbstractBaseEntity {
	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@ManyToOne(() => ExpressionEntity, (expression) => expression.tags)
	@JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;
}
