import { Column, ColumnOptions } from 'typeorm';

export const IntColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'int', ...options });
