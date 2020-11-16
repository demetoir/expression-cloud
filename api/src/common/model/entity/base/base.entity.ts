import { ApiPropertyOptional } from '@nestjs/swagger';
import { IBaseEntity } from './base.interface';
import {
	CreatedAtColumn,
	DeletedAtColumn,
	IdColumn,
	UpdatedAtColumn,
} from 'src/common/typeorm';

export abstract class BaseEntity implements IBaseEntity {
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
