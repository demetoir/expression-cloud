import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';
import { ProjectSettingEntity } from './projectSetting.entity';
import { ExpressionEntity } from './expression.entity';

@Entity({ name: 'projects' })
export class ProjectEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	// todo 이거 마이그레이션 파잉일에서 타입 boolean으로 변경
	@Column({
		name: 'is_public',
		type: 'boolean',
		nullable: false,
		default: false,
	})
	isPublic = false;

	// todo 이거 마이그레이션 파잉일에서 타입 boolean으로 변경
	@Column({
		name: 'is_locked',
		type: 'boolean',
		nullable: false,
		default: false,
	})
	isLocked = false;

	@Column({ name: 'description', type: 'text', nullable: false })
	description: string;

	@CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
	createdAt: Date;

	@UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
	updatedAt: Date;

	@DeleteDateColumn({
		type: 'datetime',
		name: 'deleted_at',
		nullable: true,
	})
	deletedAt: Date;

	@ManyToOne((type) => UserEntity, (user) => user.projects)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;

	@OneToMany((type) => TagEntity, (tags) => tags.project)
	tags: TagEntity[];

	@OneToOne((type) => ProjectSettingEntity, (setting) => setting.project)
	setting: ProjectSettingEntity;

	@OneToMany((type) => ExpressionEntity, (expressions) => expressions.project)
	expressions: ExpressionEntity[];
}
