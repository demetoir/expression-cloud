import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';
import { IComment } from './comment.interface';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity implements IComment {
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
