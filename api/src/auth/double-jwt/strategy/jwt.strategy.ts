import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET, JWT_STRATEGY } from '../constants';
import { plainToClass } from 'class-transformer';
import { TokenPayload } from '../../token/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET,
		});
	}

	async validate(payload: TokenPayload): Promise<any> {
		const user = plainToClass(TokenPayload, payload);

		// todo: check if userId, userName, role

		return user;
	}
}
