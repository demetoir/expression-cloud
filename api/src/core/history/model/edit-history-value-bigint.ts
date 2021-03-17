import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'edit_history_value_bigints' })
export class EditHistoryValueBigint {
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

	@Column({ name: 'value', type: 'bigint', nullable: false })
	value: bigint;

	// todo add edit history  relaction one to one
}
