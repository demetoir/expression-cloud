import { Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	TextColumn,
	UpdatedAtColumn,
	VarcharColumn,
} from '../../../common';

@Entity({ name: 'teams' })
export class Team {
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

	@VarcharColumn()
	name: string;

	@TextColumn()
	description: string;
}
