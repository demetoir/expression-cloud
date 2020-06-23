import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'tags' })
export class TagEntity extends AbstractBaseEntity {
	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@ManyToOne(() => ProjectEntity, (project) => project.tags)
	@JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
	project: ProjectEntity;
}
