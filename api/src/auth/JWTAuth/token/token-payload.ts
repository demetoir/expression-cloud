import { IJwtPayload } from './interface';
import {
	IsIn,
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	IsUUID,
} from 'class-validator';

export class TokenPayload implements IJwtPayload {
	@IsInt()
	@IsPositive()
	exp: number;

	@IsInt()
	@IsOptional()
	nbf?: number;

	@IsInt()
	@IsPositive()
	@IsOptional()
	iat?: number;

	@IsString()
	aud: string;

	@IsString()
	iss: string;

	@IsString()
	sub: string;

	//custom jwt claim

	@IsString()
	@IsIn(['accessToken', 'refreshToken'])
	type: 'accessToken' | 'refreshToken';

	@IsString()
	userName: string;

	@IsString()
	// todo: add role
	// @IsIn(['accessToken', 'refreshToken'])
	role: string;

	@IsInt()
	@IsPositive()
	userId: number;

	@IsUUID(`4`)
	uuid: string;
}
