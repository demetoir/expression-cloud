import { Entity } from 'typeorm';
import { IUserLike } from './user-like.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm/index';

@Entity({ name: 'user_likes' })
export class UserLikeEntity implements IUserLike {
	@PrimaryColumn({ name: 'to_user_id', type: 'bigint', nullable: false })
	toUserId: number;

	@PrimaryColumn({ name: 'from_user_id', type: 'bigint', nullable: false })
	fromUserId: number;

	@ApiPropertyOptional()
	@CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
	createdAt: Date;

	@ApiPropertyOptional()
	@UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
	updatedAt: Date;

	@ApiPropertyOptional()
	@DeleteDateColumn({
		type: 'datetime',
		name: 'deleted_at',
		nullable: true,
	})
	deletedAt: Date;
}
