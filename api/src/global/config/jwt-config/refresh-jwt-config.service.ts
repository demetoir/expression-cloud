import { Injectable } from '@nestjs/common';
import { JWTConfigService } from './jwt-config.service';

@Injectable()
export class RefreshJwtConfigService {
	constructor(private jwtConfigService: JWTConfigService) {}

	get secret(): string {
		return this.jwtConfigService.refreshTokenSecret;
	}

	get issuer(): string {
		return this.jwtConfigService.jwtIssuer;
	}

	get duration(): number {
		return this.jwtConfigService.refreshTokenDuration;
	}

	get refreshTokenCookieKey(): string {
		return this.jwtConfigService.refreshTokenCookieKey;
	}

	get refreshTokenCookiePath(): string {
		return this.jwtConfigService.refreshTokenCookiePath;
	}
}
