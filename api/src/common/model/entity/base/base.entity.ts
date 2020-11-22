import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	CreatedAtColumn,
	DeletedAtColumn,
	IdColumn,
	UpdatedAtColumn,
} from 'src/common/typeorm';

export abstract class BaseEntity {
	@ApiPropertyOptional()
	@IdColumn()
	id: number;

	@ApiPropertyOptional()
	@CreatedAtColumn()
	createdAt: Date;

	@ApiPropertyOptional()
	@UpdatedAtColumn()
	updatedAt: Date;

	@ApiPropertyOptional()
	@DeletedAtColumn()
	deletedAt: Date;
}
