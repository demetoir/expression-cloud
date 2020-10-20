import { Injectable } from '@nestjs/common';
import { JwtWrapperService } from './jwt-wrapper/jwt-wrapper.service';
import { ITokenPayload } from './token/interface';
import { TokenService } from './token/token.service';
import { isOneOfInstance } from 'src/common/libs/util';
import { plainToClass } from 'class-transformer';
import { TokenDto } from './token/token.dto';
import { validate } from 'class-validator';
import * as _ from 'lodash';
import { PayloadTypes } from './jwt-wrapper/interface';
import { ExpectedErrors } from './jwt-wrapper/error';
import { DoubleJWTValidationError } from './error';

const expiredIn = 3600;

@Injectable()
export class DoubleJwtService {
	private readonly customJwtService: JwtWrapperService<ITokenPayload>;
	private readonly tokenService: TokenService;

	constructor(
		customJwtService: JwtWrapperService<ITokenPayload>,
		tokenService: TokenService,
	) {
		this.customJwtService = customJwtService;
		this.tokenService = tokenService;
	}

	async issueToken(
		payload: ITokenPayload,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		expiredIn: number;
	}> {
		// find recent issued token
		const [accessToken, accessPayload] = await this.customJwtService.sign(
			payload,
			PayloadTypes.access,
			1,
		);

		const [refreshToken, refreshPayload] = await this.customJwtService.sign(
			payload,
			PayloadTypes.refresh,
			10,
		);

		await this.tokenService.createOne(accessPayload, accessPayload.uuid);
		await this.tokenService.createOne(refreshPayload, refreshPayload.uuid);

		return {
			accessToken,
			refreshToken,
			expiredIn,
		};
	}

	async refreshToken({
		accessToken,
		refreshToken,
	}): Promise<{
		accessToken: string;
		refreshToken: string;
		expiredIn: number;
	}> {
		// validate tokens
		const refreshPayload: ITokenPayload = await this.verifyToken(
			refreshToken,
			'refresh',
		);

		if (await this.customJwtService.isExpired(refreshPayload)) {
			throw new DoubleJWTValidationError('expired refresh token');
		}

		const accessPayload: ITokenPayload = await this.verifyToken(
			accessToken,
			'access',
		);

		// delete old access token in storage
		await this.tokenService.deleteOne(accessPayload.uuid);

		// issue new token and save to storage
		const [newAccessToken, payload] = await this.customJwtService.sign(
			accessPayload,
			PayloadTypes.refresh,
			10,
		);

		await this.tokenService.createOne(payload, payload.uuid);

		return {
			accessToken: newAccessToken,
			refreshToken: refreshToken,
			expiredIn: expiredIn,
		};
	}

	async revokeToken({ accessToken, refreshToken }): Promise<void> {
		const refreshPayload: ITokenPayload = await this.verifyToken(
			refreshToken,
			'refresh token',
		);

		const accessPayload: ITokenPayload = await this.verifyToken(
			accessToken,
			'access token',
		);

		// delete
		await this.tokenService.deleteOne(refreshPayload.uuid);
		await this.tokenService.deleteOne(accessPayload.uuid);
	}

	async verifyToken(token: string, type: string): Promise<ITokenPayload> {
		let payload: ITokenPayload;
		try {
			payload = await this.customJwtService.verify(token);
		} catch (e) {
			if (isOneOfInstance(e, ...ExpectedErrors)) {
				throw new DoubleJWTValidationError(
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
			throw new DoubleJWTValidationError(
				`invalid custom claims in ${type} token`,
				errors,
			);
		}

		// token not found in storage
		const storedPayload = await this.tokenService.findOne(payload.uuid);
		if (storedPayload === null) {
			throw new DoubleJWTValidationError(
				`${type} token is not found in token storage`,
			);
		}

		// check payload is same as stored payload
		if (!_.isEqual(payload, storedPayload)) {
			throw new DoubleJWTValidationError(
				'payload is not same with stored payload',
			);
		}

		return payload;
	}

	async verifyPayload(payload: ITokenPayload | any): Promise<void> {
		// validate custom claims in payload
		const payloadDto = plainToClass(TokenDto, payload);

		const errors = await validate(payloadDto);

		if (errors.length > 0) {
			throw new DoubleJWTValidationError(
				`invalid custom claims in payload`,
				errors,
			);
		}

		// token not found in storage
		const storedPayload = await this.tokenService.findOne(payload.uuid);
		if (storedPayload === null) {
			throw new DoubleJWTValidationError(
				`payload is not found in storage`,
			);
		}

		// check payload is same as stored payload
		if (!_.isEqual(payload, storedPayload)) {
			throw new DoubleJWTValidationError(
				'payload is not same with stored one',
			);
		}
	}
}
