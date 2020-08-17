import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { JWT_AUD, JWT_ISS } from '../constants';
import { v4 as uuid } from 'uuid';
import { JsonWebTokenError } from 'jsonwebtoken';
import { InvalidJWTSignatureError, MalformedJWTError } from './error';
import { EPayloadType, IPayload } from './interface';

@Injectable()
export class DoubleJwtService<T extends IPayload> {
	constructor(private readonly jwtService: JwtService) {}

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
			payload.type !== EPayloadType.refresh &&
			payload.type !== EPayloadType.access
		) {
			throw new MalformedJWTError(`invalid payload type ${payload.type}`);
		}

		// todo: why TypeError: uuid_1.validate is not a function
		// if (uuidValidate(payload.uuid)) {
		// 	throw new InvalidJwtPayloadError('invalid uuid');
		// }
		//
		// if (uuidVersion(payload.uuid) !== 4) {
		// 	throw new InvalidJwtPayloadError('uuid version is not 4');
		// }

		return payload;
	}

	async isExpired(payload: IPayload): Promise<boolean> {
		return payload.exp < moment().valueOf();
	}

	async signAccessToken(payload: T): Promise<[string, IPayload]> {
		const duration = 1;
		const type = EPayloadType.access;

		return this.sign(payload, type, duration);
	}

	async signRefreshToken(payload: T): Promise<[string, IPayload]> {
		const duration = 10;
		const type = EPayloadType.refresh;

		return this.sign(payload, type, duration);
	}

	async sign(payload, type, duration): Promise<[string, IPayload]> {
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
