export class TokenPayload<T> {
	// jwt registered claims
	iss: string;

	sub: string;

	aud: string;

	exp: number;

	nbf: number;

	iat: number;

	jti: string;

	// jwt private claim
	privateClaim: Partial<T>;
}
