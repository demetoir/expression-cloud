import {
	Column,
	ColumnOptions,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';

export const FKColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'bigint', ...options });

export const PKColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'bigint', ...options });

export const IdColumn = (
	options?: PrimaryGeneratedColumnNumericOptions,
): PropertyDecorator =>
	PrimaryGeneratedColumn('increment', { type: 'bigint', ...options });

export const BooleanColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({
		type: 'bool',
		width: 1,
		...options,
	});

export const CreatedAtColumn = (options?: ColumnOptions): PropertyDecorator =>
	CreateDateColumn({ name: 'created_at', ...options });

export const UpdatedAtColumn = (options?: ColumnOptions): PropertyDecorator =>
	UpdateDateColumn({ name: 'updated_at', ...options });

export const DeletedAtColumn = (options?: ColumnOptions): PropertyDecorator =>
	DeleteDateColumn({ name: 'deleted_at', ...options });

export const EnumColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'enum', ...options });

export const VarcharColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'varchar', ...options });

export const CharColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'char', ...options });

export const DateTimeColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'datetime', ...options });

export const IntColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'int', ...options });
export const TextColumn = (options?: ColumnOptions): PropertyDecorator =>
	Column({ type: 'text', ...options });
