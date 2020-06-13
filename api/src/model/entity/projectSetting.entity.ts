import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'project_settings' })
export class ProjectSettingEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;



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

	// todo add project relaction one to ont

}
