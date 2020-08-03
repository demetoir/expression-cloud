import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = {
			password: 'pass',
			username: 'name',
		};

		// todo: add bcrypt

		// const user = await this.usersService.findOne(username);

		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

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
