import { Injectable } from '@nestjs/common';
import { TokenPayload, TokenService } from 'src/core/security/token';
import { JsonResponse } from 'src/common';
import { User } from '../../../user';

// todo re implement this
@Injectable()
export class AuthService {
	constructor(private readonly tokenService: TokenService<any, any>) {}

	async mockFindUserByUserNameAndPassword(
		userName,
		password,
	): Promise<User | undefined> {
		return null;
	}

	async mockFindUserById(userId) {
		return null;
	}

	async issueRefreshTokenByBasicAuth(userName: string, password: string) {
		return null;
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
