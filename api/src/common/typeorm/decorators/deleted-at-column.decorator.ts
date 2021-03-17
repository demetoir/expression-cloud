import { ColumnOptions, DeleteDateColumn } from 'typeorm';

export const DeletedAtColumn = (options?: ColumnOptions): PropertyDecorator =>
	DeleteDateColumn({ name: 'deleted_at', ...options });
