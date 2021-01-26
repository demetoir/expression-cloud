import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GQLContext, JsonResponse } from 'src/common';
import { JWTConfigService } from 'src/security/config';
import { AuthService } from '../service';
import { BasicAuthInput } from './basic-auth.input';

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtConfigService: JWTConfigService,
	) {}

	@Mutation(() => JsonResponse)
	async loginByBasic(
		@Args('input', { type: () => BasicAuthInput })
		basicAuthInput: BasicAuthInput,
		@Context() { res }: GQLContext,
	): Promise<JsonResponse<any>> {
		const { userName, password } = basicAuthInput;
		const {
			refreshToken,
			payload,
		} = await this.authService.issueRefreshTokenByBasicAuth(
			userName,
			password,
		);

		//  set cookie for save refresh token
		res.cookie(this.jwtConfigService.refreshTokenCookieKey, refreshToken, {
			// this work in ngrok + localhost
			secure: true,
			httpOnly: true,
			path: this.jwtConfigService.refreshTokenCookiePath,
			expires: new Date(payload.exp),
		});

		const response = new JsonResponse();
		response.jsonObject = {
			refreshToken,
			issueAt: payload.iat,
			expiredAt: payload.exp,
		};

		return response;
	}

	@Mutation(() => JsonResponse)
	async issueAccessToken(
		@Context() { req }: GQLContext,
	): Promise<JsonResponse<any>> {
		const refreshToken =
			req.cookies?.[this.jwtConfigService.refreshTokenCookieKey];

		if (!refreshToken) {
			throw new UnauthorizedException('cookie not found');
		}

		return this.authService.issueAccessToken(refreshToken);
	}
}
