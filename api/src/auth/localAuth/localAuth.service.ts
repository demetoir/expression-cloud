import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthService {
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
}
