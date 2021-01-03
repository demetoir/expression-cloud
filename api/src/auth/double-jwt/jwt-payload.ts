import { IPayload, IPayloadType } from 'src/auth/double-jwt/jwt-wrapper';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class JwtPayload implements IPayload {
	@IsString()
	@IsIn(['access', 'refresh'])
	type: IPayloadType;

	@IsString()
	uuid: string;

	// reserved jwt claims
	@IsString()
	aud?: string;

	@IsString()
	iss?: string;

	@IsString()
	sub?: string;

	@IsInt()
	@IsPositive()
	exp?: number;

	@IsInt()
	@IsPositive()
	iat: number;

	@IsInt()
	@IsPositive()
	@IsOptional()
	nbf?: number;
}
