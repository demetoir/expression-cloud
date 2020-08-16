export declare type JWTType = 'accessToken' | 'refreshToken';

export interface ITokenStorageService {
	save(token: string, tokenUuid: string): void;

	delete(token: string, tokenUuid: string): void;
}
