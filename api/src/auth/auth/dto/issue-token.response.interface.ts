export interface IssueTokenResponse {
	accessToken: string;
	tokenType: 'bearer' | string;
	expiredIn: number;
	refreshToken: string;
}
