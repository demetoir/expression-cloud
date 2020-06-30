import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'project_settings' })
export class ProjectSettingEntity extends AbstractBaseEntity {
	// todo project setting 컬럼 추가하기
	// `is_public`   tinyint(1)         NOT NULL DEFAULT false,
	//     `is_locked`   tinyint(1)         NOT NULL DEFAULT false,

	@OneToOne(() => ProjectEntity, (project) => project.setting)
	@JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
	project: ProjectEntity;
}
