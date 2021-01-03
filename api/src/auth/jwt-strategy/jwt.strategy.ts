import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { IPayload, JWT_SECRET, JwtPayload } from 'src/auth/double-jwt';
import { JWT_STRATEGY } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET,
		});
	}

	// todo: fix type of arg and return
	async validate(payload: IPayload): Promise<IPayload | null> {
		const payloadDto = plainToClass(JwtPayload, payload);

		const errors = await validate(payloadDto);

		if (errors.length > 0) {
			return null;
		}

		return payload;
	}
}
