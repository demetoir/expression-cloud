import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { AuthenticationError } from './error';
import { DoubleJwtService } from './double-jwt/double-jwt.service';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { IssueTokenDto } from './dto/issue-token.dto';
import { ExpectedErrors } from './double-jwt/error';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import { ITokenPayload } from './token/interface';
import { TokenService } from './token/token.service';
import { validate } from 'class-validator';
import { isOneOfInstance } from '../common/libs/util';
import { plainToClass } from 'class-transformer';
import { TokenDto } from './token/token.dto';

const tokenType = 'bearer';

const expiredIn = 3600;

@Injectable()
export class AuthService {
	private readonly jwtService: DoubleJwtService<ITokenPayload>;
	private readonly tokenService: TokenService;

	constructor(
		jwtService: DoubleJwtService<ITokenPayload>,
		tokenService: TokenService,
	) {
		this.jwtService = jwtService;
		this.tokenService = tokenService;
	}

	async issueToken(dto: IssueTokenDto): Promise<IssueTokenResponse> {
		// todo: implement
		//   get user id and role from db
		//   validate request dto
		//   validate request dto
		if (!(await this.isValidUserByBasic(dto.username, dto.password))) {
			throw new AuthenticationError('user is not authenticated');
		}

		const userAuthInfo: ITokenPayload = {
			role: 'user',
			userName: dto.username,
			userId: 1,
		};

		// find recent issued token
		const [
			accessToken,
			accessPayload,
		] = await this.jwtService.signAccessToken(userAuthInfo);

		const [
			refreshToken,
			refreshPayload,
		] = await this.jwtService.signRefreshToken(userAuthInfo);

		await this.tokenService.createOne(accessPayload);
		await this.tokenService.createOne(refreshPayload);

		return {
			accessToken,
			refreshToken,
			expiredIn,
			tokenType,
		};
	}

	async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
		const { accessToken, refreshToken } = dto;

		// validate tokens
		const refreshPayload: ITokenPayload = await this.verifyToken(
			refreshToken,
			'refresh',
		);

		if (await this.jwtService.isExpired(refreshPayload)) {
			throw new AuthenticationError('expired refresh token');
		}

		const accessPayload: ITokenPayload = await this.verifyToken(
			accessToken,
			'access',
		);

		// delete old access token in storage
		await this.tokenService.deleteOne(accessPayload.uuid);

		// issue new token and save to storage
		const [
			newAccessToken,
			newPayload,
		] = await this.jwtService.signAccessToken(accessPayload);

		await this.tokenService.createOne(newPayload);

		return {
			accessToken: newAccessToken,
			refreshToken: refreshToken,
			expiresIn: expiredIn,
			tokenType: tokenType,
		};
	}

	async revokeToken(dto: RevokeTokenDto): Promise<void> {
		const { accessToken, refreshToken } = dto;

		const refreshPayload: ITokenPayload = await this.verifyToken(
			refreshToken,
			'refresh token',
		);

		const accessPayload: ITokenPayload = await this.verifyToken(
			accessToken,
			'access token',
		);

		// delete
		await this.tokenService.deleteOne(refreshPayload);
		await this.tokenService.deleteOne(accessPayload);
	}

	async verifyToken(token: string, type: string): Promise<ITokenPayload> {
		let payload: ITokenPayload;
		try {
			payload = await this.jwtService.verify(token);
		} catch (e) {
			if (isOneOfInstance(e, ...ExpectedErrors)) {
				throw new AuthenticationError(
					`invalid ${type} token of ${e.message}`,
					e,
				);
			}

			throw e;
		}

		// validate custom claims in payload
		const payloadDto = plainToClass(TokenDto, payload);

		const errors = await validate(payloadDto);

		if (errors.length > 0) {
			throw new AuthenticationError(
				`invalid custom claims in ${type} token`,
				errors,
			);
		}

		// token not found in storage
		const storedPayload = await this.tokenService.findOne(payload.uuid);
		if (storedPayload === null) {
			throw new AuthenticationError(
				`${type} token is not found in token storage`,
			);
		}

		// check payload is same as stored payload
		if (!_.isEqual(payload, storedPayload)) {
			throw new AuthenticationError(
				'payload is not same with stored payload',
			);
		}

		return payload;
	}

	async isValidUserByBasic(username, password): Promise<boolean> {
		return username === 'root' && password === 'pass';
	}
}
