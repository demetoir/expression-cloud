import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	FKColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';
import { User } from './user';

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

	@FKColumn()
	toUserId: number;

	@FKColumn()
	fromUserId: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'toUserId' })
	toUser: User;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'fromUserId' })
	fromUser: User;
}
