import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTOptionService } from '../JWTOption.service';
import { JWTAuthService } from '../JWTAuth.service';
import { JWT_SECRET, JWT_STRATEGY } from '../token/constants';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
	constructor() // private jwtOptionService: JWTOptionService,
	// private jwtAuthService: JWTAuthService,
	{
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET,
		});
	}

	async validate(payload): Promise<any> {
		// todo: implement this
		console.log(payload);
		return null;
		// return this.jwtAuthService.validateUser(payload);
	}
}
