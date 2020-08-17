import { ITokenPayload } from './interface';
import { IsIn, IsInt, IsString } from 'class-validator';
import { IPayloadType } from '../double-jwt/interface';

export class TokenPayloadDto implements ITokenPayload {
	@IsString()
	userName: string;

	@IsString()
	// todo: add role
	role: string;

	@IsInt()
	userId: number;

	@IsString()
	@IsIn(['access', 'refresh'])
	type: IPayloadType;

	@IsString()
	uuid: string;

	@IsString()
	aud?: string;

	@IsString()
	iss?: string;

	@IsInt()
	exp?: number;

	@IsInt()
	iat: number;

	@IsInt()
	nbf?: number;

	@IsString()
	sub?: string;
}
