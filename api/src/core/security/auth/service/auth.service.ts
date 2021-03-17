import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPayload, TokenService } from 'src/core/security/token';
import { User } from 'src/core/user/user';
import { UserMockBuilder } from 'src/core/user/user-mock.builder';
import { Role, RoleName } from 'src/core/security/role';
import { JsonResponse } from 'src/common';

@Injectable()
export class AuthService {
	constructor(private readonly tokenService: TokenService<any, any>) {}

	async mockFindUserByUserNameAndPassword(
		userName,
		password,
	): Promise<User | undefined> {
		const user = UserMockBuilder.build();
		user.name = userName;

		if (userName === 'user') {
			user.id = '1';
			const userRole = new Role();
			userRole.id = '1';
			userRole.name = RoleName.user;

			user.roles = [userRole];
		}

		if (userName === 'admin') {
			user.id = '2';
			const adminRole = new Role();
			adminRole.id = '2';
			adminRole.name = RoleName.admin;

			user.roles = [adminRole];
		}

		return user;
	}

	async mockFindUserById(userId) {
		const user = UserMockBuilder.build();

		if (userId === '1') {
			user.id = '1';
			const userRole = new Role();
			userRole.id = '1';
			userRole.name = RoleName.user;

			user.roles = [userRole];
		}

		if (userId === '2') {
			user.id = '2';
			const adminRole = new Role();
			adminRole.id = '2';
			adminRole.name = RoleName.admin;

			user.roles = [adminRole];
		}

		return user;
	}

	async issueRefreshTokenByBasicAuth(userName: string, password: string) {
		// find user by
		const foundUser: User = await this.mockFindUserByUserNameAndPassword(
			userName,
			password,
		);

		if (!foundUser) {
			throw new UnauthorizedException('user not found');
		}

		const {
			refreshToken,
			payload,
		} = await this.tokenService.issueRefreshToken(foundUser);

		return { refreshToken, payload };
	}

	async issueAccessToken(refreshToken: string): Promise<JsonResponse<any>> {
		const refreshTokenPayload: RefreshTokenPayload = await this.validateRefreshToken(
			refreshToken,
		);

		// find

		// check is token expired
		// find and validate user
		const foundUser = await this.mockFindUserById(
			refreshTokenPayload.userId,
		);

		const {
			accessToken,
			payload,
		} = await this.tokenService.issueAccessToken(foundUser);

		const response = new JsonResponse<any>();
		response.jsonObject = {
			accessToken,
			expiredAt: payload.exp,
			issuedAt: payload.iat,
		};

		return response;
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
