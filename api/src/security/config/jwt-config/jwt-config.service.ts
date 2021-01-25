import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTConfigService {
	constructor(private configService: ConfigService) {}

	get accessTokenSecret(): string {
		return this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
	}

	get refreshTokenSecret(): string {
		return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
	}

	get jwtIssuer(): string {
		return this.configService.get<string>('JWT_ISSUER');
	}

	get accessTokenDuration(): number {
		return this.configService.get<number>('JWT_ACCESS_TOKEN_DURATION');
	}

	get refreshTokenDuration(): number {
		return this.configService.get<number>('JWT_REFRESH_TOKEN_DURATION');
	}

	get refreshTokenCookieKey(): string {
		return this.configService.get<string>('JWT_REFRESH_TOKEN_COOKIE_KEY');
	}

	get refreshTokenCookiePath(): string {
		return this.configService.get<string>('JWT_REFRESH_TOKEN_COOKIE_PATH');
	}
}
