import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import tableIdType from '../../../libs/tableIdTypeResolver';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IBaseEntity } from './base.interface';

export abstract class BaseEntity implements IBaseEntity {
	@ApiPropertyOptional()
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: number;

	@ApiPropertyOptional()
	@CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
	createdAt: Date;

	@ApiPropertyOptional()
	@UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
	updatedAt: Date;

	@ApiPropertyOptional()
	@DeleteDateColumn({
		type: 'datetime',
		name: 'deleted_at',
		nullable: true,
	})
	deletedAt: Date;
}
