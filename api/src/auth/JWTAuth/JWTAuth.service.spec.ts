import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IJwtPayload, UserAuthInfo } from './token/interface';
import { JWT_AUD, JWT_ISS, JWT_SECRET } from './token/constants';
import { LocalTokenStorageService } from './token/local-token-storage.service';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { TokenModule } from './token/token.module';
import { JWTAuthService } from './JWTAuth.service';
import {
	InvalidJwtPayloadError,
	JWTExpiredError,
	JWTInvalidSignatureError,
	JWTMalformedError,
} from './error';
import { expectShouldNotCallThis } from '../../../test/lib/helper/jestHelper';

describe('JWTService', () => {
	let service: JWTAuthService;
	let jwtService: JwtService;
	let tokenStorageService: LocalTokenStorageService;

	let accessToken;
	let accessTokenUUid;

	let refreshToken;
	let refreshTokenUUid;

	let expiredAccessToken;
	let expiredAccessTokenUuid;
	let expiredRefreshToken;
	let expiredRefreshTokenUuid;

	let brokenToken = '12312.12123.123';

	let wrongSecretToken;

	async function signExpiredToken(userAuthInfo, type) {
		let duration;
		if (type === 'accessToken') {
			duration = 1;
		} else if (type === 'refreshToken') {
			duration = 10;
		}

		const now = moment();
		const iat = now.add(-duration * 2, 'hour').valueOf();
		const exp = now.add(-duration, 'hour').valueOf();
		const tokenUuid = uuid();
		const payload: IJwtPayload = {
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

		return [await jwtService.signAsync(payload), tokenUuid];
	}

	it('should prepare tokens for test', async function () {
		// given
		const userAuthInfo: UserAuthInfo = {
			role: 'user',
			userName: 'username',
			userId: 1,
		};

		// generate access token and uuid
		[accessToken, accessTokenUUid] = await service['signToken'](
			userAuthInfo,
			'accessToken',
		);
		expect(accessToken).toBeDefined();
		expect(accessTokenUUid).toBeDefined();

		// generate refresh token and uuid
		[refreshToken, refreshTokenUUid] = await service['signToken'](
			userAuthInfo,
			'refreshToken',
		);
		expect(refreshToken).toBeDefined();
		expect(refreshTokenUUid).toBeDefined();

		// generate expired access token
		[expiredAccessToken, expiredAccessTokenUuid] = await signExpiredToken(
			userAuthInfo,
			'accessToken',
		);
		expect(expiredAccessToken).toBeDefined();
		expect(expiredAccessTokenUuid).toBeDefined();

		await jwtService.verifyAsync(expiredAccessToken);

		// generate expired refresh token
		[expiredRefreshToken, expiredRefreshTokenUuid] = await signExpiredToken(
			userAuthInfo,
			'refreshToken',
		);
		expect(expiredRefreshToken).toBeDefined();
		expect(expiredRefreshTokenUuid).toBeDefined();
		await jwtService.verifyAsync(expiredRefreshToken);

		// generate wrong secret token
		wrongSecretToken = await jwtService.signAsync(
			{},
			{
				secret: 'this is not secret',
			},
		);
		expect(wrongSecretToken).toBeDefined();

		//generate broken token
		brokenToken = '3223.1233.234';
		expect(brokenToken).toBeDefined();
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: JWT_SECRET,
				}),
				TokenModule,
			],
			providers: [JWTAuthService],
		}).compile();

		service = module.get<JWTAuthService>(JWTAuthService);
		jwtService = module.get<JwtService>(JwtService);
		tokenStorageService = module.get<LocalTokenStorageService>(
			LocalTokenStorageService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(jwtService).toBeDefined();
		expect(tokenStorageService).toBeDefined();
	});

	it('should define method', function () {
		expect(service.issueAccessToken).toBeDefined();
		expect(service.revokeAccessToken).toBeDefined();
		expect(service.issueRefreshToken).toBeDefined();
		expect(service.revokeRefreshToken).toBeDefined();
		expect(service['signToken']).toBeDefined();
	});

	describe('signToken', function () {
		it('should sign access token', async function () {
			// given
			const user: UserAuthInfo = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			// when
			const [token, tokenUuid] = await service['signToken'](
				user,
				'accessToken',
			);

			//than able to verify
			const payload: IJwtPayload = await jwtService.verifyAsync(token);

			// than expect payload property
			expect(typeof payload).toEqual('object');
			expect(payload.type).toEqual('accessToken');
			expect(payload.role).toEqual('user');
			expect(payload.userName).toEqual('username');
			expect(payload.userId).toEqual(1);
			expect(payload.iss).toEqual(JWT_ISS);
			expect(payload.aud).toEqual(JWT_AUD);
			expect(payload.uuid).toBeDefined();

			// than expect exact time from exp to issue
			const duration = 1;
			const time = duration * 60 * 60 * 1000;
			expect(payload.exp - payload.iat).toEqual(time);

			expect(tokenUuid).toBeDefined();
			expect(tokenUuid).toEqual(payload.uuid);
		});

		it('should sign refresh token', async function () {
			// given
			const user: UserAuthInfo = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			// when
			const [token, tokenUuid] = await service['signToken'](
				user,
				'refreshToken',
			);

			//than able to verify
			const payload: IJwtPayload = await jwtService.verifyAsync(token);

			// than expect payload property
			expect(typeof payload).toEqual('object');
			expect(payload.type).toEqual('refreshToken');
			expect(payload.role).toEqual('user');
			expect(payload.userName).toEqual('username');
			expect(payload.userId).toEqual(1);
			expect(payload.iss).toEqual(JWT_ISS);
			expect(payload.aud).toEqual(JWT_AUD);
			expect(payload.uuid).toBeDefined();

			// than expect exact time from exp to issue

			const duration = 10;
			const time = duration * 60 * 60 * 1000;
			expect(payload.exp - payload.iat).toEqual(time);

			expect(tokenUuid).toBeDefined();
			expect(tokenUuid).toEqual(payload.uuid);
		});
	});

	describe('validate', function () {
		it('should success access token', async function () {
			// when
			const payload = await service.validate(accessToken, 'accessToken');

			expect(payload).toBeDefined();
		});

		it('should success refresh token', async function () {
			// when
			const payload = await service.validate(
				refreshToken,
				'refreshToken',
			);

			expect(payload).toBeDefined();
		});

		it('should raise error, if expired access token', async function () {
			try {
				// when
				await service.validate(expiredAccessToken, 'accessToken');
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(JWTExpiredError);
				expect(e.message).toBe('accessToken is expired');
			}
		});

		it('should raise error, if expired refresh token', async function () {
			try {
				// when
				await service.validate(expiredRefreshToken, 'refreshToken');
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(JWTExpiredError);
				expect(e.message).toBe('refreshToken is expired');
			}
		});

		it('raise error if token is not access token', async function () {
			try {
				await service.validate(refreshToken, 'accessToken');

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(InvalidJwtPayloadError);
			}
		});

		it('raise error if token is broken', async function () {
			try {
				await service.validate(brokenToken, 'accessToken');

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(JWTMalformedError);
			}
		});

		it('raise error if wrong secret', async function () {
			try {
				await service.validate(wrongSecretToken, 'accessToken');

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(JWTInvalidSignatureError);
			}
		});
	});

	describe('revokeAccessToken', function () {
		it('should revoke ', async function () {
			// given token is in storage
			await tokenStorageService.save(accessToken, accessTokenUUid);

			// when
			await service.revokeAccessToken(accessToken);

			//than remove in storage
			expect(
				tokenStorageService['storage'][accessTokenUUid],
			).not.toBeDefined();
		});

		it('should revoke expired token', async function () {
			// given token is in storage
			await tokenStorageService.save(
				expiredAccessToken,
				expiredAccessTokenUuid,
			);

			// when
			await service.revokeAccessToken(expiredAccessToken);

			expect(
				tokenStorageService['storage'][expiredAccessTokenUuid],
			).not.toBeDefined();
		});

		it('raise error if token is not access token', async function () {
			try {
				await service.revokeAccessToken(refreshToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(InvalidJwtPayloadError);
			}
		});

		it('raise error if token is broken', async function () {
			try {
				await service.revokeAccessToken(brokenToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(JWTMalformedError);
			}
		});

		it('raise error if wrong secret', async function () {
			try {
				await service.revokeAccessToken(wrongSecretToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(JWTInvalidSignatureError);
			}
		});
	});

	describe('revokeRefreshToken', function () {
		it('should revoke ', async function () {
			// given token is in storage
			await tokenStorageService.save(refreshToken, refreshTokenUUid);

			// when
			await service.revokeRefreshToken(refreshToken);

			//than remove in storage
			expect(
				tokenStorageService['storage'][refreshTokenUUid],
			).not.toBeDefined();
		});

		it('should revoke expired token', async function () {
			// given token is in storage
			await tokenStorageService.save(
				expiredRefreshToken,
				expiredRefreshTokenUuid,
			);

			// when
			await service.revokeRefreshToken(expiredRefreshToken);

			expect(
				tokenStorageService['storage'][expiredRefreshTokenUuid],
			).not.toBeDefined();
		});

		it('raise error if token is not access token', async function () {
			try {
				await service.revokeRefreshToken(accessToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(InvalidJwtPayloadError);
			}
		});

		it('raise error if token is broken', async function () {
			try {
				await service.revokeRefreshToken(brokenToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(JWTMalformedError);
			}
		});

		it('raise error if wrong secret', async function () {
			try {
				await service.revokeRefreshToken(wrongSecretToken);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(JWTInvalidSignatureError);
			}
		});
	});

	describe('issueAccessToken', function () {
		it('issueAccessToken', async function () {
			// given
			const user: UserAuthInfo = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			// when
			const [token, tokenUuid] = await service.issueAccessToken(user);

			// than expect tokenUuid
			expect(tokenUuid).toBeDefined();

			//than able to verify
			const payload: IJwtPayload = await jwtService.verifyAsync(token);

			// than expect payload property
			expect(typeof payload).toEqual('object');
			expect(payload.type).toEqual('accessToken');
			expect(payload.role).toEqual('user');
			expect(payload.userName).toEqual('username');
			expect(payload.userId).toEqual(1);
			expect(payload.iss).toEqual(JWT_ISS);
			expect(payload.aud).toEqual(JWT_AUD);
			expect(payload.uuid).toBeDefined();

			// than expect exact time from exp to issue
			const duration = 1 * 60 * 60 * 1000;
			expect(payload.exp - payload.iat).toEqual(duration);

			// than save token in token storage
			expect(tokenStorageService['storage'][payload.uuid]).toEqual(token);
		});
	});

	describe('issueRefreshToken', function () {
		it('should issueRefreshToken', async function () {
			// given
			const user: UserAuthInfo = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			// when
			const [token, tokenUuid] = await service.issueRefreshToken(user);

			// than expect tokenUuid
			expect(tokenUuid).toBeDefined();

			// than able to verify
			const payload: IJwtPayload = await jwtService.verifyAsync(token);

			// than expect payload property
			expect(typeof payload).toEqual('object');
			expect(payload.type).toEqual('refreshToken');
			expect(payload.role).toEqual('user');
			expect(payload.userName).toEqual('username');
			expect(payload.userId).toEqual(1);
			expect(payload.iss).toEqual(JWT_ISS);
			expect(payload.aud).toEqual(JWT_AUD);
			expect(payload.uuid).toBeDefined();

			// than expect exact time from exp to issue
			const duration = 1 * 60 * 60 * 1000 * 10;
			expect(payload.exp - payload.iat).toEqual(duration);

			// than save token in token storage
			expect(tokenStorageService['storage'][payload.uuid]).toEqual(token);
		});
	});
});
