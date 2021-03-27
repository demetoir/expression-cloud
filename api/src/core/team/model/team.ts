import { Entity } from 'typeorm';
import {
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
	VarcharColumn,
} from '../../../common';

@Entity({ name: 'teams' })
export class Team {
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

	@VarcharColumn()
	name: string;

	@TextColumn()
	description: string;
}
