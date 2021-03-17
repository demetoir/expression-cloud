import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';
import { PrimaryGeneratedColumn } from 'typeorm';

export const PkColumn = (
	options?: PrimaryGeneratedColumnNumericOptions,
): PropertyDecorator =>
	PrimaryGeneratedColumn('increment', { type: 'bigint', ...options });
