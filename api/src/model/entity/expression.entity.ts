import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { VectorEntity } from './vector.entity';
import { ProjectEntity } from './project.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'expressions' })
export class ExpressionEntity extends AbstractBaseEntity {
	@Column({ name: 'type', type: 'tinyint', nullable: false })
	type: number;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@Column({ name: 'description', type: 'text', nullable: false })
	description: string;

	@OneToMany(() => VectorEntity, (vector) => vector.expression)
	vectors: VectorEntity[];

	@ManyToOne(() => ProjectEntity, (project) => project.expressions)
	@JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
	project: ProjectEntity;
}
