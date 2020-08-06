import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(private jwtService: JwtService) {}

	async issueAccessToken(user: any) {
		const payload = { username: user.username, sub: user.userId };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async issueRefreshToken(user: any) {
		const payload = { username: user.username, sub: user.userId };

		return {
			refresh_token: this.jwtService.sign(payload),
		};
	}
}
