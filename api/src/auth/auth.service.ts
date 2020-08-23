import { Injectable } from '@nestjs/common';
import { DoubleJwtService } from './double-jwt/double-jwt.service';
import { IssueTokenDto } from './dto/issue-token.dto';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import { AuthenticationError } from './error';
import { ITokenPayload } from './double-jwt/token/interface';

@Injectable()
export class AuthService {
	constructor(private readonly doubleJwtService: DoubleJwtService) {
		this.doubleJwtService = doubleJwtService;
	}

	async issueToken(dto: IssueTokenDto): Promise<IssueTokenResponse> {
		if (!(await this.isValidUserByBasic(dto.username, dto.password))) {
			throw new AuthenticationError('user is not authenticated');
		}

		const userAuthInfo: ITokenPayload = {
			role: 'user',
			userName: dto.username,
			userId: 1,
		};

		const {
			accessToken,
			refreshToken,
			expiredIn,
		} = await this.doubleJwtService.issueToken(userAuthInfo);

		return {
			accessToken,
			refreshToken,
			expiredIn,
			tokenType: 'bearer',
		};
	}

	async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
		const {
			accessToken,
			refreshToken,
			expiredIn,
		} = await this.doubleJwtService.refreshToken({
			accessToken: dto.accessToken,
			refreshToken: dto.refreshToken,
		});

		return {
			accessToken,
			refreshToken,
			expiredIn,
			tokenType: 'bearer',
		};
	}

	async revokeToken(dto: RevokeTokenDto): Promise<void> {
		const { accessToken, refreshToken } = dto;

		await this.doubleJwtService.revokeToken({ accessToken, refreshToken });
	}

	async isValidUserByBasic(
		username: string,
		password: string,
	): Promise<boolean> {
		return username === 'root' && password === 'pass';
	}
}
