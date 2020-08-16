import { Injectable } from '@nestjs/common';
import { RevokeTokenRequestDto } from './dto/revokeToken.request.dto';
import { RevokeTokenResponseDto } from './dto/revokeToken.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../common/model/entity/user.entity';
import { AuthenticationError } from './error';
import { DoubleJwtService } from './double-jwt/double-jwt.service';
import { ITokenPayload } from './token/token-payload';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { IssueTokenDto } from './dto/issue-token.dto';
import { ExpectedErrors } from './double-jwt/error';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

function isInstanceOfErrors(errorArray, e) {
	for (const error of errorArray) {
		if (e instanceof error) {
			return true;
		}
	}
	return false;
}

const tokenType = 'bearer';

const expiredIn = 3600;

@Injectable()
export class AuthService {
	private readonly jwtService: DoubleJwtService<ITokenPayload>;

	@InjectRepository(UserEntity)
	private readonly userRepository: Repository<UserEntity>;

	constructor(
		jwtService: DoubleJwtService<ITokenPayload>,
		@InjectRepository(UserEntity)
		userRepository: Repository<UserEntity>,
	) {
		this.userRepository = userRepository;
		this.jwtService = jwtService;
	}

	async issueToken(dto: IssueTokenDto): Promise<IssueTokenResponse> {
		// todo: implement
		//   get user id and role from db
		//   validate request dto
		if (!(dto.username === 'root' && dto.password === 'pass')) {
			throw new AuthenticationError('user is not authenticated');
		}

		const userAuthInfo: ITokenPayload = {
			role: 'user',
			userName: dto.username,
		};
		// find recent issued token
		const [accessToken] = await this.jwtService.signAccessToken(
			userAuthInfo,
		);

		const [refreshToken] = await this.jwtService.signRefreshToken(
			userAuthInfo,
		);

		return {
			accessToken,
			refreshToken,
			expiredIn,
			tokenType,
		};
	}

	async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
		// todo: implement this

		// validate
		let payload: ITokenPayload;
		try {
			payload = await this.jwtService.verify(dto.refreshToken);

			// todo: validate custom claim in payload

			await this.jwtService.verify(dto.accessToken);
		} catch (e) {
			if (isInstanceOfErrors(ExpectedErrors, e)) {
				throw new AuthenticationError(e.message, e);
			}

			throw e;
		}

		// revoke and reissue access token
		// await this.jwtService.revokeAccessToken(oldAccessToken);
		//
		// const userAuthInfo: UserAuthInfo = {
		// 	userId: payload.userId,
		// 	userName: payload.userName,
		// 	role: payload.role,
		// };
		// const [newAccessToken] = await this.jwtAuthService.issueAccessToken(
		// 	userAuthInfo,
		// );

		const [newAccessToken] = await this.jwtService.signAccessToken(payload);

		return {
			accessToken: newAccessToken,
			refreshToken: dto.refreshToken,
			expiresIn: expiredIn,
			tokenType: tokenType,
		};
	}

	async revokeToken(
		dto: RevokeTokenRequestDto,
	): Promise<RevokeTokenResponseDto> {
		// todo: implement this

		return null;
	}
}
