import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_likes' })
export class UserLikeEntity {
	@PrimaryColumn({ name: 'to_user_id', type: 'bigint', nullable: false })
	toUserId: number;

	@PrimaryColumn({ name: 'from_user_id', type: 'bigint', nullable: false })
	fromUserId: number;

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
}
