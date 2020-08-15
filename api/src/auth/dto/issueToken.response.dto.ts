export class IssueTokenResponseDto {
	accessToken: string;
	tokenType: 'bearer' | string;
	expiresIn: number;
	refreshToken: string;
}
