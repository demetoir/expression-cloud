import { Column, ColumnOptions } from 'typeorm';

export const VarcharColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'varchar', ...options });
