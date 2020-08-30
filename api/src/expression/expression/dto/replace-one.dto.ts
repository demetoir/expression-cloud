import { IsByteLength, IsNumber, IsPositive, IsString } from 'class-validator';
import {
	MAX_TEXT,
	MAX_VARCHAR,
} from '../../../common/constants/database-data-type';

export class ReplaceOneDto {
	@IsNumber()
	@IsPositive()
	type: number;

	@IsString()
	name: string;

	@IsString()
	@IsByteLength(0, MAX_VARCHAR)
	content: string;

	@IsString()
	@IsByteLength(0, MAX_TEXT)
	description: string;
}
