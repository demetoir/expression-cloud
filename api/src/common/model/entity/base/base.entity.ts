import {
	CreatedAtColumn,
	DeletedAtColumn,
	IdColumn,
	UpdatedAtColumn,
} from 'src/common/typeorm';

export abstract class BaseEntity {
	@IdColumn()
	id: number;

	@CreatedAtColumn()
	createdAt: Date;

	@UpdatedAtColumn()
	updatedAt: Date;

	@DeletedAtColumn()
	deletedAt: Date;
}
