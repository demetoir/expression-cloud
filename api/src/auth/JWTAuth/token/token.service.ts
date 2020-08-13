import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { JWT_AUD, JWT_ISS } from './constants';
import { JWTPayload, JWTType, UserAuthInfo } from './interface';
import { v4 as uuid } from 'uuid';
import { TokenStorageService } from './tokenStorage.service';

@Injectable()
export class TokenService {
	constructor(
		private jwtService: JwtService,
		private readonly tokenStorageService: TokenStorageService,
	) {}

	async issueAccessToken(userAuthInfo: UserAuthInfo): Promise<string> {
		const [token, tokenUuid] = await this.signToken(
			userAuthInfo,
			'accessToken',
		);

		await this.tokenStorageService.save(token, tokenUuid);

		return token;
	}

	async issueRefreshToken(user: UserAuthInfo): Promise<string> {
		const [token, tokenUuid] = await this.signToken(user, 'refreshToken');

		await this.tokenStorageService.save(token, tokenUuid);

		return token;
	}

	async revokeAccessToken(token: string): Promise<void> {
		const payload: JWTPayload = await this.jwtService.verifyAsync(token);

		if (payload.type !== 'accessToken') {
			throw new Error('token is not access token');
		}

		await this.tokenStorageService.delete(token, payload.uuid);
	}

	async revokeRefreshToken(token: string): Promise<void> {
		const payload: JWTPayload = await this.jwtService.verifyAsync(token);

		if (payload.type !== 'refreshToken') {
			throw new Error('token is not refresh token');
		}

		await this.tokenStorageService.delete(token, payload.uuid);
	}

	async validate(token: string, type: JWTType): Promise<JWTPayload> {
		const payload: JWTPayload = await this.jwtService.verifyAsync(token);

		if (payload.type !== type) {
			throw new Error(`token expect ${type} but ${payload.type}`);
		}

		return payload;
	}

	async signToken(
		userAuthInfo: UserAuthInfo,
		type: JWTType,
	): Promise<[string, string]> {
		let duration;
		if (type === 'accessToken') {
			duration = 1;
		} else if (type === 'refreshToken') {
			duration = 10;
		}

		const now = moment();
		const iat = now.valueOf();
		const exp = now.add(duration, 'hour').valueOf();
		const tokenUuid = uuid();
		const payload: JWTPayload = {
			type: type,
			role: userAuthInfo.role,
			userName: userAuthInfo.userName,
			userId: userAuthInfo.userId,
			sub: userAuthInfo.userId.toString(),
			iss: JWT_ISS,
			aud: JWT_AUD,
			iat: iat,
			exp: exp,
			uuid: tokenUuid,
		};

		return [await this.jwtService.signAsync(payload), tokenUuid];
	}
}
