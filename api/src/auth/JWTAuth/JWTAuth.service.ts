import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { JWT_AUD, JWT_ISS } from './token/constants';
import { JWTPayload, JWTType, UserAuthInfo } from './token/interface';
import { v4 as uuid } from 'uuid';
import { TokenStorageService } from './token/tokenStorage.service';
import { JWTAuthException } from './error/JWTAuth.exception';

@Injectable()
export class JWTAuthService {
	constructor(
		private jwtService: JwtService,
		private readonly tokenStorageService: TokenStorageService,
	) {}

	// todo: inject from env
	public get expiredIn(): number {
		return 3600;
	}

	public get tokenType(): string {
		return 'bearer';
	}

	async issueAccessToken(
		userAuthInfo: UserAuthInfo,
	): Promise<[string, string]> {
		const [token, tokenUuid] = await this.signToken(
			userAuthInfo,
			'accessToken',
		);

		await this.tokenStorageService.save(token, tokenUuid);

		return [token, tokenUuid];
	}

	async issueRefreshToken(user: UserAuthInfo): Promise<[string, string]> {
		const [token, tokenUuid] = await this.signToken(user, 'refreshToken');

		await this.tokenStorageService.save(token, tokenUuid);

		return [token, tokenUuid];
	}

	async revokeAccessToken(token: string): Promise<void> {
		const payload: JWTPayload = await this.jwtService.verifyAsync(token);

		if (payload.type !== 'accessToken') {
			throw new JWTAuthException('token is not access token');
		}

		await this.tokenStorageService.delete(token, payload.uuid);
	}

	async revokeRefreshToken(token: string): Promise<void> {
		const payload: JWTPayload = await this.jwtService.verifyAsync(token);

		if (payload.type !== 'refreshToken') {
			throw new JWTAuthException('token is not refresh token');
		}

		await this.tokenStorageService.delete(token, payload.uuid);
	}

	async validate(token: string, type: JWTType): Promise<JWTPayload> {
		const payload: JWTPayload = await this.jwtService.verifyAsync(token);

		if (payload.type !== type) {
			throw new JWTAuthException(
				`token expect ${type} but ${payload.type}`,
			);
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
