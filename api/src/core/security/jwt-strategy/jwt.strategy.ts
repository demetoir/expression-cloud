import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from '../token';
import { AuthService } from '../auth';
import { JWT_STRATEGY } from './constant';
import { JWTConfigService } from '../../../global/config/jwt-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtConfigService: JWTConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: jwtConfigService.accessTokenSecret,
		});
	}

	async validate(payload: TokenPayload<any>): Promise<any> {
		if (!this.authService.isValidAccessTokenPayload(payload)) {
			throw new UnauthorizedException('invalid jwt access token');
		}

		return payload.privateClaim;
	}
}
