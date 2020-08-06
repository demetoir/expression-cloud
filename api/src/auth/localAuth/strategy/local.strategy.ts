import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalAuthService } from '../localAuth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private localAuthService: LocalAuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.localAuthService.validateUser(
			username,
			password,
		);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
