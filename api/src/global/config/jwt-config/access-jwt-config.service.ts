import { Injectable } from '@nestjs/common';
import { JWTConfigService } from './jwt-config.service';

@Injectable()
export class AccessJwtConfigService {
	constructor(private jwtConfigService: JWTConfigService) {}

	get secret(): string {
		return this.jwtConfigService.accessTokenSecret;
	}

	get issuer(): string {
		return this.jwtConfigService.jwtIssuer;
	}

	get duration(): number {
		return this.jwtConfigService.accessTokenDuration;
	}
}
