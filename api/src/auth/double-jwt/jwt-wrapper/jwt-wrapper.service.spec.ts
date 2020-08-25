import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_AUD, JWT_ISS, JWT_SECRET } from './constants';
import { JwtWrapperService } from './jwt-wrapper.service';
import { InvalidJWTSignatureError, MalformedJWTError } from './error';
import * as moment from 'moment';
import { v1 as uuidV1, v4 as uuidV4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { IPayload, PayloadTypes } from './interface';
import { expectShouldNotCallThis } from '../../../../test/lib/helper/jestHelper';

interface TestIJwtPayload extends IPayload {
	userName: string;
	role: string;
}

describe('JWTWrapperService', () => {
	let service: JwtWrapperService<TestIJwtPayload>;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: JWT_SECRET,
				}),
			],
			providers: [JwtWrapperService],
		}).compile();

		service = module.get(JwtWrapperService);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
		expect(jwtService).toBeDefined();
	});

	it('should define method', function () {
		expect(service.verify).toBeDefined();
		expect(service.isExpired).toBeDefined();
	});

	describe('sign', function () {
		it('should sign access token with only required', async function () {
			// given
			const user: TestIJwtPayload = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			const duration = 1;
			const type = PayloadTypes.access;

			// when
			const [token, tokenPayload] = await service.sign(
				user,
				type,
				duration,
			);

			//than able to verify
			const payload: TestIJwtPayload = await jwtService.verifyAsync(
				token,
			);

			// than expect payload property
			expect(payload.type).toEqual('access');
			expect(payload.iss).toEqual(JWT_ISS);
			expect(payload.aud).toEqual(JWT_AUD);
			expect(payload.role).toEqual(user.role);
			expect(payload.userName).toEqual(user.userName);
			expect(payload.userId).toEqual(user.userId);
			expect(payload.uuid).toEqual(tokenPayload.uuid);

			// expect(uuidValidate(payload.uuid)).toBeTruthy();
			// expect(uuidVersion(payload.uuid)).toEqual(4);

			// than expect exact time from exp to issue
			const time = duration * 60 * 60 * 1000;
			expect(payload.exp - payload.iat).toEqual(time);

			expect(tokenPayload.uuid).toBeDefined();
			expect(tokenPayload.uuid).toEqual(payload.uuid);
		});

		it('should sign refresh token', async function () {
			// given
			const user: TestIJwtPayload = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			const duration = 1;
			const type = PayloadTypes.refresh;

			// when
			const [token, tokenPayload] = await service.sign(
				user,
				type,
				duration,
			);

			//than able to verify
			const payload: TestIJwtPayload = await jwtService.verifyAsync(
				token,
			);

			// than expect payload property
			expect(payload.type).toEqual('refresh');
			expect(payload.iss).toEqual(JWT_ISS);
			expect(payload.aud).toEqual(JWT_AUD);
			expect(payload.role).toEqual(user.role);
			expect(payload.userName).toEqual(user.userName);
			expect(payload.userId).toEqual(user.userId);
			expect(payload.uuid).toEqual(tokenPayload.uuid);
			// than expect exact time from exp to issue

			const time = duration * 60 * 60 * 1000;
			expect(payload.exp - payload.iat).toEqual(time);

			expect(payload.uuid).toBeDefined();
			expect(tokenPayload.uuid).toEqual(payload.uuid);
		});
	});

	describe('verify', function () {
		it('should verify', async function () {
			// given
			const user: TestIJwtPayload = {
				role: 'user',
				userName: 'username',
				userId: 1,
				uuid: uuidV4(),
			};

			const duration = 10;
			const type = PayloadTypes.refresh;

			const [token, tokenUuid] = await service.sign(user, type, duration);

			// when
			const payload = await service.verify(token);

			// than
			expect(payload).toBeDefined();
			expect(payload.role).toBe(user.role);
			expect(payload.userName).toBe(user.userName);
			expect(payload.userId).toBe(user.userId);
			expect(tokenUuid).toBeDefined();
		});

		it('should raise error, if broken token', async function () {
			// given
			const brokenToken = '123124';

			try {
				// when
				await service.verify(brokenToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(MalformedJWTError);
			}
		});

		it('should raise error, if invalid signature', async function () {
			// given token with invalid signature
			const payload = {};

			const token = await jwt.sign(payload, '~12');

			try {
				// when
				await service.verify(token);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(InvalidJWTSignatureError);
			}
		});

		it('should raise error, if invalid type', async function () {
			// given token with invalid signature
			const tokenUuid = uuidV4();
			const payload = {
				role: 'user',
				userName: 'username',
				userId: 1,
				uuid: tokenUuid,
				type: 'not this type',
			};

			const token = await jwt.sign(payload, JWT_SECRET);

			try {
				// when
				await service.verify(token);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(MalformedJWTError);
			}
		});

		it('should raise error, if uuid is uuid scheme', async function () {
			// given token with invalid signature
			const duration = 10;
			const iat = moment().valueOf();
			const exp = moment().add(duration, 'hour').valueOf();
			const tokenUuid = '1234';
			const payload = {
				sub: 'any',
				iss: JWT_ISS,
				aud: JWT_AUD,
				iat: iat,
				exp: exp,
				uuid: tokenUuid,
				type: PayloadTypes.refresh,
			};

			const token = await jwt.sign(payload, JWT_SECRET);

			try {
				// when
				await service.verify(token);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(MalformedJWTError);
				expect(e.message).toBe('invalid uuid');
			}
		});

		it('should raise error, if uuid version is different', async function () {
			// given token with invalid signature
			const duration = 10;
			const iat = moment().valueOf();
			const exp = moment().add(duration, 'hour').valueOf();
			const tokenUuid = uuidV1();
			const payload = {
				sub: 'any',
				iss: JWT_ISS,
				aud: JWT_AUD,
				iat: iat,
				exp: exp,
				uuid: tokenUuid,
				type: PayloadTypes.refresh,
			};

			const token = await jwt.sign(payload, JWT_SECRET);

			try {
				// when
				await service.verify(token);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(MalformedJWTError);
				expect(e.message).toBe('uuid version is not 4');
			}
		});
	});

	describe('isExpired', function () {
		it('should return false', async function () {
			const duration = 10;
			const iat = moment().valueOf();
			const exp = moment().add(duration, 'hour').valueOf();
			const tokenUuid = uuidV4();
			const payload: IPayload = {
				sub: 'any',
				iss: JWT_ISS,
				aud: JWT_AUD,
				iat: iat,
				exp: exp,
				uuid: tokenUuid,
			};

			const res = await service.isExpired(payload);

			expect(res).toBeFalsy();
		});

		it('should return true', async function () {
			const duration = 10;
			const iat = moment().valueOf();
			const exp = moment().add(-duration, 'hour').valueOf();
			const tokenUuid = uuidV4();
			const payload: IPayload = {
				sub: 'any',
				iss: JWT_ISS,
				aud: JWT_AUD,
				iat: iat,
				exp: exp,
				uuid: tokenUuid,
			};

			const res = await service.isExpired(payload);

			expect(res).toBeTruthy();
		});
	});
});
