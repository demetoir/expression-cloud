import { Column, Entity } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'edit_history_value_varchars' })
export class EditHistoryValueVarchar {
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

	@Column({ name: 'value', type: 'varchar', length: 255, nullable: false })
	value: string;

	// todo add edit history  relaction one to one
}
