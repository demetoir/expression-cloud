import { Injectable } from '@nestjs/common';
import { IssueTokenRequestDto } from './dto/issueToken.request.dto';
import { RevokeTokenRequestDto } from './dto/revokeToken.request.dto';
import { IssueTokenResponseDto } from './dto/issueToken.response.dto';
import { RevokeTokenResponseDto } from './dto/revokeToken.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../common/model/entity/user.entity';
import { AuthenticationError } from './error';
import { DoubleJwtService } from './double-jwt/double-jwt.service';
import { ITokenPayload } from './token/token-payload';
import { RefreshTokenResponseDto } from './dto/refreshToken.response.dto';
import { RefreshTokenRequestDto } from './dto/refreshToken.request.dto';

@Injectable()
export class AuthService {
	private readonly jwtAuthService: DoubleJwtService<ITokenPayload>;

	@InjectRepository(UserEntity)
	private readonly userRepository: Repository<UserEntity>;

	constructor(
		jwtAuthService: DoubleJwtService<ITokenPayload>,
		@InjectRepository(UserEntity)
		userRepository: Repository<UserEntity>,
	) {
		this.userRepository = userRepository;
		this.jwtAuthService = jwtAuthService;
	}

	async issueToken(
		dto: IssueTokenRequestDto,
	): Promise<IssueTokenResponseDto> {
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
		const [accessToken, _] = await this.jwtAuthService.signAccessToken(
			userAuthInfo,
		);

		userAuthInfo.type = 'refreshToken';
		const [refreshToken] = await this.jwtAuthService.signRefreshToken(
			userAuthInfo,
		);

		return new IssueTokenResponseDto({
			accessToken,
			refreshToken,
			expiredIn: 3600,
			tokenType: 'bearer',
		});
	}

	async refreshToken({
		accessToken: oldAccessToken,
		refreshToken,
	}: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
		return null;
		// todo: implement this
		//
		// // validate
		// let payload: IJwtPayload;
		// try {
		// 	payload = await this.jwtAuthService.validate(
		// 		refreshToken,
		// 		'refreshToken',
		// 	);
		//
		// 	// todo: validate custom claim in payload
		//
		// 	await this.jwtAuthService.validate(oldAccessToken, 'accessToken');
		// } catch (e) {
		// 	if (e instanceof JWTMalformedError) {
		// 		throw new AuthenticationError(e.message, e);
		// 	}
		//
		// 	if (e instanceof JWTInvalidSignatureError) {
		// 		throw new AuthenticationError(e.message, e);
		// 	}
		//
		// 	throw e;
		// }
		//
		// // revoke and reissue access token
		// await this.jwtAuthService.revokeAccessToken(oldAccessToken);
		//
		// const userAuthInfo: UserAuthInfo = {
		// 	userId: payload.userId,
		// 	userName: payload.userName,
		// 	role: payload.role,
		// };
		// const [newAccessToken] = await this.jwtAuthService.issueAccessToken(
		// 	userAuthInfo,
		// );
		//
		// const res = new RefreshTokenResponseDto();
		// res.accessToken = newAccessToken;
		// res.refreshToken = refreshToken;
		// res.expiresIn = this.jwtAuthService.expiredIn;
		// res.tokenType = this.jwtAuthService.tokenType;
		//
		// return res;
	}

	async revokeToken(
		dto: RevokeTokenRequestDto,
	): Promise<RevokeTokenResponseDto> {
		// todo: implement this

		return null;
	}
}
