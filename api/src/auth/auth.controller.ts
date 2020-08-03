import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('v1/auth')
export class AuthController {
	private readonly logger = logger;

	constructor(private authService: AuthService) {}

	// basic
	@UseGuards(LocalAuthGuard)
	@Post('/basic-login')
	async login(@Request() req) {
		return req.user;
	}

	@Post('/basic-sign-in')
	async signIn() {
		return 'sign-in';
	}

	@UseGuards(JwtAuthGuard)
	@Get('/who-am-i')
	async whoAmI(@Request() req) {
		return req.user;
	}

	@UseGuards(LocalAuthGuard)
	@Post('/token')
	async getToken(@Request() req) {
		return this.authService.issueRefreshToken(req.user);
	}
}
