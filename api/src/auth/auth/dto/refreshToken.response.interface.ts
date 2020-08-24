export interface RefreshTokenResponse {
	tokenType: 'bearer' | string;
	expiredIn: number;
	refreshToken: string;
	accessToken: string;
}
