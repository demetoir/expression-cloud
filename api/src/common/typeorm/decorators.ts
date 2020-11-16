import {
	Column,
	ColumnOptions,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';

export const FKColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'bigint', ...options });
};

export const IdColumn = (
	options?: PrimaryGeneratedColumnNumericOptions,
): PropertyDecorator => {
	return PrimaryGeneratedColumn('increment', { type: 'bigint', ...options });
};

export const BooleanColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'bool', width: 1, ...options });
};

export const CreatedAtColumn = (options?: ColumnOptions): PropertyDecorator => {
	return CreateDateColumn({ name: 'created_at', ...options });
};

export const UpdatedAtColumn = (options?: ColumnOptions): PropertyDecorator => {
	return UpdateDateColumn({ name: 'updated_at', ...options });
};

export const DeletedAtColumn = (options?: ColumnOptions): PropertyDecorator => {
	return DeleteDateColumn({ name: 'deleted_at', ...options });
};

export const EnumColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'enum', ...options });
};

export const VarcharColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'varchar', ...options });
};

export const CharColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'char', ...options });
};

export const DateTimeColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'datetime', ...options });
};

export const IntColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'int', ...options });
};
export const TextColumn = (options?: ColumnOptions): PropertyDecorator => {
	return Column({ type: 'text', ...options });
};
