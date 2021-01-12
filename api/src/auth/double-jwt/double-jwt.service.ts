import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { DoubleJWTValidationError } from './error';
import {
	BaseJwtError,
	IPayload,
	JwtWrapperService,
	PayloadTypes,
} from './jwt-wrapper';
import { JwtPayload } from './jwt-payload';

const expiredIn = 3600;
const accessTokenDuration = 1;
const refreshTokenDuration = 10;

@Injectable()
export class DoubleJwtService<T extends IPayload> {
	private readonly jwtService: JwtWrapperService<T>;

	constructor(jwtService: JwtWrapperService<T>) {
		this.jwtService = jwtService;
	}

	async issueToken(
		payload: T,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		expiredIn: number;
	}> {
		// find recent issued token
		const [accessToken] = await this.jwtService.sign(
			payload,
			PayloadTypes.access,
			accessTokenDuration,
		);

		const [refreshToken] = await this.jwtService.sign(
			payload,
			PayloadTypes.refresh,
			refreshTokenDuration,
		);

		return {
			accessToken,
			refreshToken,
			expiredIn,
		};
	}

	async refreshToken(
		accessToken: string,
		refreshToken: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		expiredIn: number;
	}> {
		// validate tokens
		const refreshPayload: T = await this.verifyToken(refreshToken);

		if (this.jwtService.isExpired(refreshPayload)) {
			throw new DoubleJWTValidationError('expired refresh token');
		}

		const accessPayload: T = await this.verifyToken(accessToken);

		// issue new token and save to storage
		const [newAccessToken] = await this.jwtService.sign(
			accessPayload,
			PayloadTypes.refresh,
			accessTokenDuration,
		);

		return {
			accessToken: newAccessToken,
			refreshToken,
			expiredIn,
		};
	}

	async verifyToken(token: string): Promise<T> {
		let payload: T;

		try {
			payload = await this.jwtService.verify(token);
		} catch (e) {
			if (e instanceof BaseJwtError) {
				throw new DoubleJWTValidationError(
					`invalid token of ${e.message}`,
					e,
				);
			}

			throw e;
		}

		// validate custom claims in payload
		const payloadDto = plainToClass(JwtPayload, payload);

		const errors = await validate(payloadDto);

		if (errors.length > 0) {
			throw new DoubleJWTValidationError(
				`invalid custom claims in token`,
				errors,
			);
		}

		return payload;
	}
}
