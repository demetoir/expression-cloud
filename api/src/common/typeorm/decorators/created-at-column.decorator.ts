import { ColumnOptions, CreateDateColumn } from 'typeorm';

export const CreatedAtColumn = (options?: ColumnOptions): PropertyDecorator =>
	CreateDateColumn({ name: 'created_at', ...options });
