import { Injectable } from '@nestjs/common';
import { JsonResponse } from 'src/common';
import { TokenPayload, TokenService } from '../../token';
import { BasicAuthResponse } from '../resolver/basic-auth.response';
import { BasicAuthInput } from '../resolver';

// todo re implement this
@Injectable()
export class AuthService {
	constructor(private readonly tokenService: TokenService<any, any>) {}

	async loginByBasicAuth(input: BasicAuthInput): Promise<BasicAuthResponse> {
		return {
			refreshToken: '3',
			expiredAt: 123,
			issueAt: 123,
		};
	}

	async issueAccessToken(refreshToken: string): Promise<JsonResponse<any>> {
		return null;
	}

	async validateRefreshToken(
		refreshToken: string,
	): Promise<TokenPayload<any>> {
		const payload = await this.tokenService.validateRefreshToken(
			refreshToken,
		);

		return payload;
	}

	async validateAccessToken(accessToken: string): Promise<TokenPayload<any>> {
		const payload = await this.tokenService.verifyAccessToken(accessToken);

		return payload;
	}

	isValidAccessTokenPayload(accessTokenPayload: TokenPayload<any>): boolean {
		const now = new Date();

		if (accessTokenPayload.exp < now.valueOf()) {
			return false;
		}

		return true;
	}
}
