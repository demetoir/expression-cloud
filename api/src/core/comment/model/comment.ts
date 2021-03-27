import { Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	TextColumn,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'comments' })
export class Comment {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField()
	@DeletedAtColumn()
	deletedAt: Date;

	@TextColumn()
	content: string;
}
