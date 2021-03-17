import { Column, ColumnOptions } from 'typeorm';

export const FKColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'bigint', ...options });
