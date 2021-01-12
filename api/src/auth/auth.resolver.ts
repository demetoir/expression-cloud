import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt-strategy';
import { JWTResponse } from 'src/auth/jwt-response';
import { WhoAmI } from 'src/whoami';
import { AuthService } from 'src/auth/auth.service';

@Resolver(() => JWTResponse)
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query(() => JWTResponse)
	async publishTokenByBasic() {}

	async getToken(): Promise<JWTResponse> {
		return this.authService.issueToken();
	}

	async refreshToken() {
		return this.authService.refreshToken();
	}

	async revokeToken() {
		return this.authService.revokeToken();
	}

	@UseGuards(JwtGuard)
	@Query(() => WhoAmI)
	async whoAmI(): Promise<WhoAmI> {
		return this.authService.whami();
	}
}
