import { Entity, PrimaryColumn } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'user_likes' })
export class UserLike {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField({ nullable: true })
	@DeletedAtColumn()
	deletedAt: Date;

	@PrimaryColumn({ name: 'to_user_id', type: 'bigint', nullable: false })
	toUserId: number;

	@PrimaryColumn({ name: 'from_user_id', type: 'bigint', nullable: false })
	fromUserId: number;
}
