import { Column, ColumnOptions } from 'typeorm';

export const CharColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'char', ...options });
