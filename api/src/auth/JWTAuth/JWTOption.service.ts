import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from './token/constants';

// todo: add more option for jwt module
@Injectable()
export class JWTOptionService implements JwtOptionsFactory {
	createJwtOptions(): JwtModuleOptions {
		return {
			secret: JWT_SECRET,
		};
	}
}
