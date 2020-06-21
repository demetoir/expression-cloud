import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../libs/tableIdTypeResolver';
import { UserEntity } from './user.entity';

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

	@OneToOne(() => UserEntity, (user) => user.oauth)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
