import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { isOneOfInstance } from 'src/common';
import { DoubleJWTValidationError } from './error';
import { ExpectedErrors, JwtWrapperService, PayloadTypes } from './jwt-wrapper';
import { JwtPayload } from './jwt-payload';

const expiredIn = 3600;

@Injectable()
export class DoubleJwtService<T> {
	private readonly customJwtService: JwtWrapperService<T>;

	constructor(customJwtService: JwtWrapperService<T>) {
		this.customJwtService = customJwtService;
	}

	async issueToken(
		payload: T,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		expiredIn: number;
	}> {
		// find recent issued token
		const [accessToken] = await this.customJwtService.sign(
			payload,
			PayloadTypes.access,
			1,
		);

		const [refreshToken] = await this.customJwtService.sign(
			payload,
			PayloadTypes.refresh,
			10,
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

		if (await this.customJwtService.isExpired(refreshPayload)) {
			throw new DoubleJWTValidationError('expired refresh token');
		}

		const accessPayload: T = await this.verifyToken(accessToken);

		// issue new token and save to storage
		const [newAccessToken] = await this.customJwtService.sign(
			accessPayload,
			PayloadTypes.refresh,
			10,
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
			payload = await this.customJwtService.verify(token);
		} catch (e) {
			if (isOneOfInstance(e, ...ExpectedErrors)) {
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
