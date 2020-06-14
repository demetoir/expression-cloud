import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';
import { UserEntity } from './user.entity';

@Entity({ name: 'projects' })
export class ProjectEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	// todo 이거 자꾸 0,1로 나옴 중간 트랜스폼이 필요하다
	@Column({
		name: 'is_public',
		type: 'tinyint',
		nullable: false,
		default: false,
	})
	isPublic = false;

	// todo 이거 자꾸 0,1로 나옴 중간 트랜스폼이 필요하다
	@Column({
		name: 'is_locked',
		type: 'tinyint',
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

	@ManyToOne(
		type => UserEntity,
		user => user.projects,
	)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
