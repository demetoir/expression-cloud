import { IsString } from 'class-validator';
import { IJwtPayload } from '../double-jwt/interface';

export interface ITokenPayload extends IJwtPayload {
	userName: string;

	role: string;
}

export class TokenPayload implements ITokenPayload {
	@IsString()
	userName: string;

	@IsString()
	// todo: add role
	// @IsIn(['accessToken', 'refreshToken'])
	role: string;
}
