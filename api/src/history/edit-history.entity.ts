import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { BaseEntity } from '../common/model/entity/base/base.entity';

@Entity({ name: 'edit_histories' })
export class EditHistoryEntity extends BaseEntity {
	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'edit_type', type: 'smallint', nullable: false })
	editType: number;

	@OneToOne(() => EditHistoryEntity, undefined, {
		eager: false,
	})
	@JoinColumn({ name: 'prev_id', referencedColumnName: 'id' })
	prev: EditHistoryEntity;

	@ManyToOne(() => UserEntity, (user) => user.editHistories)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
