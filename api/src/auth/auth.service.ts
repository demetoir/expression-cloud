import { Injectable } from '@nestjs/common';
import { JWTAuthService } from './JWTAuth/JWTAuth.service';
import { IssueTokenRequestDto } from './dto/issueToken.request.dto';
import { RefreshTokenRequestDto } from './dto/refreshToken.request.dto';
import { RevokeTokenRequestDto } from './dto/revokeToken.request.dto';
import { IssueTokenResponseDto } from './dto/issueToken.response.dto';
import { RefreshTokenResponseDto } from './dto/refreshToken.response.dto';
import { RevokeTokenResponseDto } from './dto/revokeToken.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../common/model/entity/user.entity';
import { UserAuthInfo } from './JWTAuth/token/interface';
import { InvalidUserException } from './error/invalidUserException.error';

@Injectable()
export class AuthService {
	private readonly jwtAuthService: JWTAuthService;

	@InjectRepository(UserEntity)
	private readonly userRepository: Repository<UserEntity>;

	constructor(
		jwtAuthService: JWTAuthService,
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
			throw new InvalidUserException();
		}

		const userAuthInfo: UserAuthInfo = {
			userId: 1,
			role: 'user',
			userName: dto.username,
		};

		// find recent issued token

		const [accessToken] = await this.jwtAuthService.issueAccessToken(
			userAuthInfo,
		);
		const [refreshToken] = await this.jwtAuthService.issueRefreshToken(
			userAuthInfo,
		);

		const res = new IssueTokenResponseDto();
		res.accessToken = accessToken;
		res.refreshToken = refreshToken;
		res.expiresIn = this.jwtAuthService.expiredIn;
		res.tokenType = this.jwtAuthService.tokenType;

		return res;
	}

	async refreshToken(
		dto: RefreshTokenRequestDto,
	): Promise<RefreshTokenResponseDto> {
		// todo: implement this
		//
		// const accessToken;
		//
		// const refreshToken;
		//
		// await this.jwtAuthService.revokeAccessToken(accessToken);
		//
		// const userAuthInfo;
		// const newAccessToken = await this.jwtAuthService.issueAccessToken(
		// 	userAuthInfo,
		// );

		// const res = new RefreshTokenResponseDto();
		// res.accessToken = accessToken;
		// res.refreshToken = refreshToken;
		// res.expiresIn = this.jwtAuthService.expiredIn;
		// res.tokenType = this.jwtAuthService.tokenType;

		return null;
	}

	async revokeToken(
		dto: RevokeTokenRequestDto,
	): Promise<RevokeTokenResponseDto> {
		// todo: implement this

		return null;
	}
}
