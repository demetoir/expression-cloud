import { BeforeInsert, Entity } from 'typeorm';
import {
	BooleanColumn,
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	TextColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from '../../../common';

@Entity({ name: 'notice' })
export class Notice {
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

	@TextColumn()
	content: string;

	@BooleanColumn()
	isRead: boolean;

	// @ManyToOne(() => User, (user) => user.notices, { eager: false })
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;

	@BeforeInsert()
	beforeInsert(): void {
		this.isRead = false;
	}
}
