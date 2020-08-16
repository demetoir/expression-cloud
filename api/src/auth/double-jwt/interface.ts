export declare interface IJwtPayload {
	//reserved jwt claims
	exp?: number;
	nbf?: number;
	iat?: number;

	aud?: string;

	iss?: string;
	sub?: string;

	//custom jwt claim
	type?: 'accessToken' | 'refreshToken';
	uuid?: string;
	userId?: number;
}
