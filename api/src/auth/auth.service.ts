import { Injectable } from '@nestjs/common';
import { DoubleJwtService } from 'src/auth/double-jwt';
import { WhoAmI } from 'src/whoami';
import { JWTResponse } from 'src/auth/jwt-response';

@Injectable()
export class AuthService {
	constructor(private readonly doubleJwtService: DoubleJwtService<any>) {}

	async issueToken() {
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

	async whami() {
		const whoami = new WhoAmI();

		whoami.message = 'shit';

		return whoami;
	}
}
