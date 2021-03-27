import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from '../../../common';

@Entity({ name: 'edit_history_value_bigints' })
export class EditHistoryValueBigint {
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

	@Column({ name: 'value', type: 'bigint', nullable: false })
	value: bigint;

	// todo add edit history  relaction one to one
}
