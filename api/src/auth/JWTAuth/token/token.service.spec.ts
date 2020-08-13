import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { JWTPayload, UserAuthInfo } from './interface';
import { JWT_AUD, JWT_ISS, JWT_SECRET } from './constants';
import { TokenStorageService } from './tokenStorage.service';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';

describe('TokenService', () => {
	let service: TokenService;
	let jwtService: JwtService;
	let tokenStorageService: TokenStorageService;

	let accessToken;
	let accessTokenUUid;

	let refreshToken;
	let refreshTokenUUid;

	let expiredAccessToken;
	let expiredAccesstokenUuid;
	let expiredRefreshToken;
	let expiredRefreshTokenUuid;

	let brokenToken = '12312.12123.123';

	let wrongSecretToken;

	it('should prepare tokens for test', async function () {
		// given
		const user: UserAuthInfo = {
			role: 'user',
			userName: 'username',
			userId: 1,
		};

		// generate access token and uuid
		[accessToken, accessTokenUUid] = await service['signToken'](
			user,
			'accessToken',
		);
		expect(accessToken).toBeDefined();
		expect(accessTokenUUid).toBeDefined();

		// generate refresh token and uuid
		[refreshToken, refreshTokenUUid] = await service['signToken'](
			user,
			'refreshToken',
		);
		expect(refreshToken).toBeDefined();
		expect(refreshTokenUUid).toBeDefined();

		// generate expired access token
		const now = moment();
		const iat = now.valueOf();
		const exp = now.add(-1, 'hour').valueOf();
		const tokenUuid = uuid();
		const payload: JWTPayload = {
			type: 'accessToken',
			role: user.role,
			userName: user.userName,
			userId: user.userId,
			sub: user.userId.toString(),
			iss: JWT_ISS,
			aud: JWT_AUD,
			iat: iat,
			exp: exp,
			uuid: tokenUuid,
		};

		[expiredAccessToken, expiredAccesstokenUuid] = await service[
			'signToken'
		](user, 'accessToken');
		expect(expiredAccessToken).toBeDefined();
		expect(expiredAccesstokenUuid).toBeDefined();

		// generate expired refresh token
		payload.type = 'refreshToken';
		[expiredRefreshToken, expiredRefreshTokenUuid] = await service[
			'signToken'
		](user, 'refreshToken');
		expect(expiredRefreshToken).toBeDefined();
		expect(expiredRefreshTokenUuid).toBeDefined();

		// generate wrong secret token
		payload.type = 'accessToken';
		wrongSecretToken = await jwtService.signAsync(payload, {
			secret: 'this is not secret',
		});
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
			],
			providers: [TokenService, TokenStorageService],
			exports: [TokenService],
		}).compile();

		service = module.get<TokenService>(TokenService);
		jwtService = module.get<JwtService>(JwtService);
		tokenStorageService = module.get<TokenStorageService>(
			TokenStorageService,
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
			const payload: JWTPayload = await jwtService.verifyAsync(token);

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
			const payload: JWTPayload = await jwtService.verifyAsync(token);

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
				expiredAccesstokenUuid,
			);

			// when
			await service.revokeAccessToken(expiredAccessToken);

			expect(
				tokenStorageService['storage'][expiredAccesstokenUuid],
			).not.toBeDefined();
		});

		it('raise error if token is not access token', async function () {
			try {
				await service.revokeAccessToken(refreshToken);

				throw new Error('not this error');
			} catch (e) {
				expect(e.message).toEqual('token is not access token');
			}
		});

		it('raise error if token is expired', async function () {
			try {
				await service.revokeAccessToken(brokenToken);

				throw new Error('not this error');
			} catch (e) {
				expect(e.message).toEqual('invalid token');
			}
		});

		it('raise error if wrong secret', async function () {
			try {
				await service.revokeAccessToken(wrongSecretToken);

				throw new Error('not this error');
			} catch (e) {
				expect(e.message).toEqual('invalid signature');
			}
		});
	});

	describe('revokeRefreshToken', function () {});

	describe('issueAccessToken', function () {
		it('issueAccessToken', async function () {
			// given
			const user: UserAuthInfo = {
				role: 'user',
				userName: 'username',
				userId: 1,
			};

			// when
			const token = await service.issueAccessToken(user);

			//than able to verify
			const payload: JWTPayload = await jwtService.verifyAsync(token);

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
			const token = await service.issueRefreshToken(user);

			// than able to verify
			const payload: JWTPayload = await jwtService.verifyAsync(token);

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
