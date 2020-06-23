import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'edit_histories' })
export class EditHistoryEntity extends AbstractBaseEntity {
	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'edit_type', type: 'smallint', nullable: false })
	editType: number;

	@ManyToOne(() => UserEntity, (user) => user.editHistories)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;

	@OneToOne(() => EditHistoryEntity, undefined, {
		eager: false,
	})
	@JoinColumn({ name: 'prev_id', referencedColumnName: 'id' })
	prev: EditHistoryEntity;
}
