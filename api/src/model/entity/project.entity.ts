import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';
import { ProjectSettingEntity } from './projectSetting.entity';
import { ExpressionEntity } from './expression.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends AbstractBaseEntity {
	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

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

	@Column({ name: 'description', type: 'text', nullable: false })
	description: string;

	@OneToOne(() => ProjectSettingEntity, (setting) => setting.project)
	setting: ProjectSettingEntity;

	@OneToMany(() => TagEntity, (tags) => tags.project)
	tags: TagEntity[];

	@OneToMany(() => ExpressionEntity, (expressions) => expressions.project)
	expressions: ExpressionEntity[];

	@ManyToOne(() => UserEntity, (user) => user.projects)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
