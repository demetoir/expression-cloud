import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	FKColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from '../../../common';
import { User } from './user';

@Entity()
export class UserLike {
	@IdField()
	@PkColumn()
	id: number;

	@CreatedAtField()
	@CreatedAtColumn()
	createdAt: Date;

	@UpdatedAtField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DeletedAtField()
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
