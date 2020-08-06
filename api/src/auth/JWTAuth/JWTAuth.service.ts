import { Injectable } from '@nestjs/common';
import { TokenService } from './token/Token.service';

@Injectable()
export class JWTAuthService {
	constructor(private tokenService: TokenService) {}

	async validateUser(payload: any): Promise<any> {
		return { userId: payload.sub, username: payload.username };
	}

	async reissueToken(user: any): Promise<any> {
		return this.tokenService.issueRefreshToken(user);
	}
}
