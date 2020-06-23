import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends AbstractBaseEntity {
	@Column({ name: 'content', type: 'text', nullable: false })
	content: string;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;

	@ManyToOne(() => UserEntity, (user) => user.comments)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
