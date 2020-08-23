import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from './constants';

// todo: add more option for custom-jwt module
@Injectable()
export class CustomJwtOptionService implements JwtOptionsFactory {
	createJwtOptions(): JwtModuleOptions {
		return {
			secret: JWT_SECRET,
		};
	}
}
