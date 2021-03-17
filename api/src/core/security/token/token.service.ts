import * as dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { classToPlain } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import {
	AccessJwtConfigService,
	IJWTConfigService,
	RefreshJwtConfigService,
} from 'src/core/security/config';
import { TokenPayload } from './token-payload';
import { ISignedResult } from './type';

@Injectable()
export class TokenService<AccessClaim, RefreshClaim> {
	constructor(
		private readonly jwtService: JwtService,
		private readonly accessJwtConfigService: AccessJwtConfigService,
		private readonly refreshJwtConfigService: RefreshJwtConfigService,
	) {}

	async signToken(
		privateClaim: AccessClaim | RefreshClaim,
		jwtConfigService: IJWTConfigService,
		options: JwtSignOptions,
	): Promise<ISignedResult> {
		const payload = new TokenPayload<any>();
		payload.privateClaim = privateClaim;

		// register claim
		payload.iss = jwtConfigService.issuer;
		payload.aud = 'default-aud';
		payload.jti = uuid();
		const now = dayjs();
		payload.iat = now.valueOf();
		payload.exp = now.add(jwtConfigService.duration, 'second').valueOf();
		payload.nbf = 0;

		// sign token
		const plainPayload = classToPlain(payload);
		const token = await this.jwtService.signAsync(plainPayload, {
			secret: jwtConfigService.secret,
			...options,
		});

		return { token, payload };
	}

	async issueAccessToken(
		privateClaim: AccessClaim,
		jwtSignOptions: JwtSignOptions = {},
	): Promise<ISignedResult> {
		return this.signToken(
			privateClaim,
			this.accessJwtConfigService,
			jwtSignOptions,
		);
	}

	async issueRefreshToken(
		privateClaim: RefreshClaim,
		jwtSignOptions: JwtSignOptions = {},
	): Promise<ISignedResult> {
		return this.signToken(
			privateClaim,
			this.refreshJwtConfigService,
			jwtSignOptions,
		);
	}

	async verifyAccessToken(
		token: string,
		jwtVerifyOptions: JwtVerifyOptions = {},
	): Promise<TokenPayload<any>> {
		return this.jwtService.verifyAsync(token, {
			secret: this.accessJwtConfigService.secret,
			...jwtVerifyOptions,
		});
	}

	async validateRefreshToken(
		token: string,
		jwtVerifyOptions: JwtVerifyOptions = {},
	): Promise<TokenPayload<any>> {
		return this.jwtService.verifyAsync(token, {
			secret: this.refreshJwtConfigService.secret,
			...jwtVerifyOptions,
		});
	}
}
