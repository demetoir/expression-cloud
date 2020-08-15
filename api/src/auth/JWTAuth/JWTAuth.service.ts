import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { JWT_AUD, JWT_ISS } from './token/constants';
import { JWTPayload, JWTType, UserAuthInfo } from './token/interface';
import { v4 as uuid } from 'uuid';
import { LocalTokenStorageService } from './token/local-token-storage.service';
import { JsonWebTokenError } from 'jsonwebtoken';
import {
	JWTInvalidSignatureError,
	JWTMalformedError,
	JWTPayloadTypeError,
} from './error';

@Injectable()
export class JWTAuthService {
	constructor(
		private jwtService: JwtService,
		private readonly tokenStorageService: LocalTokenStorageService,
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
		const payload: JWTPayload = await this.validate(token, 'accessToken');

		await this.tokenStorageService.delete(token, payload.uuid);
	}

	async revokeRefreshToken(token: string): Promise<void> {
		const payload: JWTPayload = await this.validate(token, 'refreshToken');

		await this.tokenStorageService.delete(token, payload.uuid);
	}

	async validate(token: string, type: JWTType): Promise<JWTPayload> {
		let payload: JWTPayload;
		try {
			payload = await this.jwtService.verifyAsync(token);
		} catch (e) {
			if (e instanceof JsonWebTokenError) {
				if (e.message === 'invalid signature') {
					throw new JWTInvalidSignatureError(e.message, e);
				}

				if (e.message === 'invalid token') {
					throw new JWTMalformedError(e.message, e);
				}
			}

			throw e;
		}

		if (payload.type !== type) {
			throw new JWTPayloadTypeError(
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
