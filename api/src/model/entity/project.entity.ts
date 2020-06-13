import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'projects' })
export class ProjectEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
	name: string;

	@Column({
		name: 'is_public',
		type: 'tinyint',
		nullable: false,
		default: false,
	})
	isPublic: boolean;

	@Column({
		name: 'is_locked',
		type: 'tinyint',
		nullable: false,
		defl: false,
	})
	isLocked: boolean;

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

	// todo add user relation many to one

}
