import { Injectable } from '@nestjs/common';
import { JWTAuthService } from './JWTAuth/JWTAuth.service';

@Injectable()
export class AuthService {
	constructor(private jwtAuthService: JWTAuthService) {}

	async issueRefreshToken(user) {
		return this.jwtAuthService.issueToken(user);
	}
}
