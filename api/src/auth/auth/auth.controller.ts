import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt-strategy';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../localAuth/guard/localAuth.guard';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { IssueTokenDto } from './dto/issue-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import { AuthenticationError } from './error';

@Controller('v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

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

	@UseGuards(JwtGuard)
	@Get('/who-am-i')
	async whoAmI(@Request() req) {
		return req.user;
	}

	@Post('/token')
	async issueToken(@Body() dto: IssueTokenDto): Promise<IssueTokenResponse> {
		try {
			return await this.authService.issueToken(dto);
		} catch (e) {
			if (e instanceof AuthenticationError) {
				throw new UnauthorizedException(e, e.message);
			}

			throw e;
		}
	}

	@UseGuards(JwtGuard)
	@Post('/token/refresh')
	async refreshToken(
		@Body() dto: RefreshTokenDto,
	): Promise<RefreshTokenResponse> {
		try {
			return this.authService.refreshToken(dto);
		} catch (e) {
			if (e instanceof AuthenticationError) {
				throw new UnauthorizedException(e, e.message);
			}

			throw e;
		}
	}

	@UseGuards(JwtGuard)
	@Post('/token/revocation')
	async revokeToken(@Body() dto: RevokeTokenDto): Promise<void> {
		try {
			return this.authService.revokeToken(dto);
		} catch (e) {
			if (e instanceof AuthenticationError) {
				throw new UnauthorizedException(e, e.message);
			}

			throw e;
		}
	}
}
