import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService } from '@nestjs/jwt';
import moment from 'moment';
import {
	v4 as uuid,
	validate as uuidValidate,
	version as uuidVersion,
} from 'uuid';
import { JsonWebTokenError } from 'jsonwebtoken';
import { InvalidJwtSignatureError, MalformedJwtError } from './error';
import { IPayload, PayloadTypes } from './interface';
import { JWT_AUD, JWT_ISS } from './constants';

@Injectable()
export class JwtWrapperService<T extends IPayload> {
	constructor(private readonly jwtService: _JwtService) {}

	async verify(token: string): Promise<T> {
		let payload: T;

		try {
			payload = await this.jwtService.verifyAsync(token);
		} catch (e) {
			if (e instanceof JsonWebTokenError) {
				if (e.message === 'invalid signature') {
					throw new InvalidJwtSignatureError(`${e.message}`, e);
				}

				if (e.message === 'jwt malformed') {
					throw new MalformedJwtError(`${e.message}`, e);
				}
			}

			throw e;
		}

		if (
			payload.type !== PayloadTypes.refresh &&
			payload.type !== PayloadTypes.access
		) {
			throw new MalformedJwtError(`invalid payload type ${payload.type}`);
		}

		if (!uuidValidate(payload.uuid)) {
			throw new MalformedJwtError('invalid uuid');
		}

		if (uuidVersion(payload.uuid) !== 4) {
			throw new MalformedJwtError('uuid version is not 4');
		}

		return payload;
	}

	isExpired(payload: T): boolean {
		return payload.exp < moment().valueOf();
	}

	async sign(
		payload: T,
		type: PayloadTypes,
		duration: number,
	): Promise<[string, T]> {
		const now = moment();
		const iat = now.valueOf();
		const exp = now.add(duration, 'hour').valueOf();
		const tokenUuid = uuid();
		const newPayload: T = {
			// sub: payload.userId.toString(),
			iss: JWT_ISS,
			aud: JWT_AUD,
			iat,
			exp,
			uuid: tokenUuid,
			type,
			...payload,
		};

		return [await this.jwtService.signAsync(newPayload), newPayload];
	}
}
