import { Column, ColumnOptions } from 'typeorm';

export const DateTimeColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'datetime', ...options });
