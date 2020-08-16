import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET, JWT_STRATEGY } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
	constructor() // private jwtAuthService: JWTAuthService, // private jwtOptionService: JWTOptionService,
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
