import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { logger } from '../common/libs/winstonToolkit';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localAuth/guard/localAuth.guard';
import { JwtGuard } from './double-jwt/guard/JWT.guard';
import { RevokeTokenRequestDto } from './dto/revokeToken.request.dto';
import { RevokeTokenResponseDto } from './dto/revokeToken.response.dto';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { IssueTokenDto } from './dto/issue-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';

@Controller('v1/auth')
export class AuthController {
	private readonly logger = logger;

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
		return this.authService.issueToken(dto);
	}

	@Post('/token/refresh')
	async refreshToken(
		@Body() dto: RefreshTokenDto,
	): Promise<RefreshTokenResponse> {
		return this.authService.refreshToken(dto);
	}

	@Post('/token/revocation')
	async revokeToken(
		@Body() dto: RevokeTokenRequestDto,
	): Promise<RevokeTokenResponseDto> {
		return this.authService.revokeToken(dto);
	}
}
