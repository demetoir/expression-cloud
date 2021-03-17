import { ColumnOptions, UpdateDateColumn } from 'typeorm';

export const UpdatedAtColumn = (options?: ColumnOptions): PropertyDecorator =>
	UpdateDateColumn({ name: 'updated_at', ...options });
