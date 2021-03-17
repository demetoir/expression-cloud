import { Column, ColumnOptions } from 'typeorm';

export const BooleanColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({
		type: 'bool',
		width: 1,
		...options,
	});
