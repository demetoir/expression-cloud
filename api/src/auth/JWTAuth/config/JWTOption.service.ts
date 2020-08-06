import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

// todo: add more option for jwt module
@Injectable()
export class JWTOptionService implements JwtOptionsFactory {
	// constructor(private configService: ConfigService) {}
	//
	// get secret(): string {
	// 	return this.configService.get<string>('JWT_SECRET');
	// }

	createJwtOptions(): JwtModuleOptions {
		return {
			// secret: this.secret,
			secret: 'jwt_secret',
			signOptions: {
				expiresIn: '60h',
			},
		};
	}
}
