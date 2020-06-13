import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';

@Entity({ name: 'oauths' })
export class OauthEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

	@Column({ name: 'type', type: 'bigint', nullable: false })
	type: number;

	@Column({ name: 'authId', type: 'text', nullable: false })
	authId: string;

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
