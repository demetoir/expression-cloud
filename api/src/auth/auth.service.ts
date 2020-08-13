import { Injectable } from '@nestjs/common';
import { JWTAuthService } from './JWTAuth/JWTAuth.service';
import { IssueTokenRequestDto } from './dto/issueToken.request.dto';
import { RefreshTokenRequestDto } from './dto/refreshToken.request.dto';
import { RevokeTokenRequestDto } from './dto/revokeToken.request.dto';

@Injectable()
export class AuthService {
	constructor(private jwtAuthService: JWTAuthService) {}

	async issueToken(dto: IssueTokenRequestDto): Promise<IssueTokenRequestDto> {
		// todo: implemnet this
		const accessToken = await this.jwtAuthService.issueAccessToken(null);

		const refreshToken = await this.jwtAuthService.issueRefreshToken(null);

		return null;
	}

	async refreshToken(
		dto: RefreshTokenRequestDto,
	): Promise<RefreshTokenRequestDto> {
		// todo: implement this

		return null;
	}

	async revokeToken(
		dto: RevokeTokenRequestDto,
	): Promise<RevokeTokenRequestDto> {
		// todo: implement this

		return null;
	}
}
