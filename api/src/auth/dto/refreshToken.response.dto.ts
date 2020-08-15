export class RefreshTokenResponseDto {
	tokenType: 'bearer' | string;
	expiresIn: number;
	refreshToken: string;
	accessToken: string;
}
