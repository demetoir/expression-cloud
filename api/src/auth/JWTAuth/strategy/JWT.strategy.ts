import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTOptionService } from '../token/config/JWTOption.service';
import { JWTAuthService } from '../JWTAuth.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private jwtOptionService: JWTOptionService,
		private jwtAuthService: JWTAuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtOptionService.createJwtOptions().secret,
		});
	}

	async validate(payload: any) {
		return this.jwtAuthService.validateUser(payload);
	}
}
