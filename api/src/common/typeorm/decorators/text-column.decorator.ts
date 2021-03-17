import { Column, ColumnOptions } from 'typeorm';

export const TextColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'text', ...options });
