import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'notice' })
export class Notice {
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

	@Column({ type: 'text', name: 'content', nullable: false })
	content: string;

	@Column({
		type: 'boolean',
		name: 'is_read',
		nullable: false,
		default: false,
	})
	isRead: boolean;

	// @ManyToOne(() => User, (user) => user.notices, { eager: false })
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;
}
