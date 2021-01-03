import { Query, Resolver } from '@nestjs/graphql';
import { DoubleJwtService } from 'src/auth/double-jwt';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt-strategy';
import { JWTResponse } from 'src/auth/jwt-response';
import { WhoAmI } from 'src/whoami';

@Resolver(() => JWTResponse)
export class AuthResolver {
	constructor(private readonly doubleJwtService: DoubleJwtService) {}

	@Query(() => JWTResponse)
	async getToken(): Promise<JWTResponse> {
		const payload = {
			role: 'shit',
			userId: 1,
			userName: 'what',
		};

		const {
			accessToken,
			refreshToken,
		} = await this.doubleJwtService.issueToken(payload);

		const jwtResponse = new JWTResponse();
		jwtResponse.accessToken = accessToken;
		jwtResponse.refreshToken = refreshToken;
		jwtResponse.tokenType = 'bearer';

		return jwtResponse;
	}

	async refreshToken() {}

	async revokeToken() {}

	@UseGuards(JwtGuard)
	@Query(() => WhoAmI)
	async whoAmI(): Promise<WhoAmI> {
		const whoami = new WhoAmI();

		whoami.message = 'shit';

		return whoami;
	}
}
