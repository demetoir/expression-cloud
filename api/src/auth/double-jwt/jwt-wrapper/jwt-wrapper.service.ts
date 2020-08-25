import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import {
	v4 as uuid,
	validate as uuidValidate,
	version as uuidVersion,
} from 'uuid';
import { JsonWebTokenError } from 'jsonwebtoken';
import { InvalidJWTSignatureError, MalformedJWTError } from './error';
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
					throw new InvalidJWTSignatureError(`${e.message}`, e);
				}

				if (e.message === 'jwt malformed') {
					throw new MalformedJWTError(`${e.message}`, e);
				}
			}

			throw e;
		}

		if (
			payload.type !== PayloadTypes.refresh &&
			payload.type !== PayloadTypes.access
		) {
			throw new MalformedJWTError(`invalid payload type ${payload.type}`);
		}

		if (!uuidValidate(payload.uuid)) {
			throw new MalformedJWTError('invalid uuid');
		}

		if (uuidVersion(payload.uuid) !== 4) {
			throw new MalformedJWTError('uuid version is not 4');
		}

		return payload;
	}

	async isExpired(payload: IPayload): Promise<boolean> {
		return payload.exp < moment().valueOf();
	}

	async sign(
		payload: T,
		type: PayloadTypes,
		duration: number,
	): Promise<[string, IPayload]> {
		const now = moment();
		const iat = now.valueOf();
		const exp = now.add(duration, 'hour').valueOf();
		const tokenUuid = uuid();
		const newPayload: T = {
			sub: payload.userId.toString(),
			iss: JWT_ISS,
			aud: JWT_AUD,
			iat: iat,
			exp: exp,
			uuid: tokenUuid,
			type: type,
			...payload,
		};

		return [await this.jwtService.signAsync(newPayload), newPayload];
	}
}
