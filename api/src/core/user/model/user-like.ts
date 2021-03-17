import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { IdField, PkColumn } from '../../../common';

@Entity({ name: 'user_likes' })
export class UserLike {
	@IdField()
	@PkColumn()
	id: number;

	// @DateTimeField()
	// @CreatedAtColumn()
	// createdAt: Date;
	//
	// @DateTimeField()
	// @UpdatedAtColumn()
	// updatedAt: Date;
	//
	// @DateTimeField({ nullable: true })
	// @DeletedAtColumn()
	// deletedAt: Date;

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
