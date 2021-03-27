import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
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

@Entity({ name: 'edit_histories' })
export class EditHistory {
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

	@Column({ name: 'ref_id', type: 'bigint', nullable: true })
	refId: bigint;

	@Column({ name: 'ref_type', type: 'bigint', nullable: true })
	refType: bigint;

	@Column({ name: 'edit_type', type: 'smallint', nullable: false })
	editType: number;

	@OneToOne(() => EditHistory, undefined, {
		eager: false,
	})
	@JoinColumn({ name: 'prev_id', referencedColumnName: 'id' })
	prev: EditHistory;
}
