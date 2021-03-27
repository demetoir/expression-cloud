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

@Entity({ name: 'edit_history_value_varchars' })
export class EditHistoryValueVarchar {
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

	@Column({ name: 'value', type: 'varchar', length: 255, nullable: false })
	value: string;

	// todo add edit history  relaction one to one
}
