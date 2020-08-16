export interface RefreshTokenResponse {
	tokenType: 'bearer' | string;
	expiresIn: number;
	refreshToken: string;
	accessToken: string;
}
