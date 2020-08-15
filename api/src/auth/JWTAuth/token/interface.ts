export declare interface IJwtPayload {
	//reserved jwt claims
	exp: number;
	nbf?: number;
	iat?: number;

	aud: string;

	iss: string;
	sub: string;

	//custom jwt claim
	type: 'accessToken' | 'refreshToken';
	userName: string;
	role: string;
	userId: number;
	uuid: string;
}

export interface UserAuthInfo {
	userName: string;
	role: string;
	userId: number;
}

export declare type JWTType = 'accessToken' | 'refreshToken';

export interface ITokenStorageService {
	save(token: string, tokenUuid: string): void;

	delete(token: string, tokenUuid: string): void;
}
