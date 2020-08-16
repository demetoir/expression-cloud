export class IssueTokenResponseDto {
	accessToken: string;
	tokenType: 'bearer' | string;
	expiredIn: number;
	refreshToken: string;
}
