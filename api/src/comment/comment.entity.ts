import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/model/entity/base/base.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
	@Column({ name: 'content', type: 'text', nullable: false })
	content: string;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;
}
