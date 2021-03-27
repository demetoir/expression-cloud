import { BeforeInsert, Entity } from 'typeorm';
import {
	BooleanColumn,
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	TextColumn,
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
