import { UnauthorizedException } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { GQLContext, InputArgs, JsonResponse } from 'src/common';
import { AuthService } from '../service';
import { BasicAuthInput } from './basic-auth.input';
import { JWTConfigService } from '../../../../global/config/jwt-config';
import { BasicAuthResponse } from './basic-auth.response';

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtConfigService: JWTConfigService,
	) {}

	@Query(() => JsonResponse)
	async loginByBasic(
		@InputArgs(BasicAuthInput) input: BasicAuthInput,
		@Context() { res }: GQLContext,
	): Promise<JsonResponse<BasicAuthResponse>> {
		const {
			refreshToken,
			expiredAt,
			issueAt,
		} = await this.authService.loginByBasicAuth(input);

		//  set cookie for save refresh token
		res.cookie(this.jwtConfigService.refreshTokenCookieKey, refreshToken, {
			// this work in ngrok + localhost
			secure: true,
			httpOnly: true,
			path: this.jwtConfigService.refreshTokenCookiePath,
			expires: new Date(expiredAt),
		});

		const response = new JsonResponse<BasicAuthResponse>();
		response.jsonObject = {
			refreshToken,
			issueAt,
			expiredAt,
		};

		return response;
	}

	@Query(() => JsonResponse)
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
