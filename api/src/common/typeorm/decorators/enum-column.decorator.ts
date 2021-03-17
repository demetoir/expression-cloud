import { Column, ColumnOptions } from 'typeorm';

export const EnumColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'enum', ...options });
