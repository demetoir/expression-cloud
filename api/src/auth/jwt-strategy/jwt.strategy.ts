import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from '../double-jwt/jwt-wrapper/constants';
import { DoubleJwtService } from '../double-jwt/double-jwt.service';
import { ITokenPayload } from '../double-jwt/token/interface';
import { DoubleJWTValidationError } from '../double-jwt/error';
import { JWT_STRATEGY } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
	constructor(private readonly doubleJwtService: DoubleJwtService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET,
		});
	}

	// todo: fix type of arg and return
	async validate(payload: ITokenPayload): Promise<ITokenPayload | null> {
		try {
			await this.doubleJwtService.verifyPayload(payload);

			return payload;
		} catch (e) {
			if (e instanceof DoubleJWTValidationError) {
				return null;
			}

			throw e;
		}
	}
}
