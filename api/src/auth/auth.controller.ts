import { Controller, Get, Post } from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';

@Controller('auth')
export class AuthController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	// todo: implement this

	@Post('/login')
	async login() {
		return 'login';
	}

	@Post('/sign-in')
	async signIn() {
		return 'sign-in';
	}

	@Get('/who-am-i')
	async whoAmI() {
		return 'whoAmI';
	}

	@Get('token')
	async getToken() {
		return 'token';
	}
}
