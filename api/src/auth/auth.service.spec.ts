import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { DoubleJwtService } from './double-jwt/double-jwt.service';
import { AuthenticationError } from './error';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import assert from 'assert';
import { IssueTokenDto } from './dto/issue-token.dto';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { TokenService } from './token/token.service';
import {
	InvalidJWTSignatureError,
	MalformedJWTError,
} from './double-jwt/error';
import { PayloadTypes } from './double-jwt/interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as _ from 'lodash';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';

const expiredIn = 3600;
const tokenType = 'bearer';

const payloadFixtures = {
	refresh: {
		exp: 1231231233333233,
		nbf: 123,
		iat: 123,
		uuid: 'uuid1',
		type: PayloadTypes.refresh,

		iss: 'iss',
		aud: 'aud',
		role: 'role',
		sub: 'sub',
		userId: 1,
		userName: 'username',
	},
	access: {
		exp: 12312312312312312,
		iat: 123,
		uuid: 'uuid2',
		type: PayloadTypes.access,

		iss: 'iss',
		aud: 'aud',
		role: 'role',
		sub: 'sub',
		userId: 1,
		userName: 'username',
	},
	brokenAccess: {},
	expiredRefresh: {
		exp: 2,
		nbf: 123,
		iat: 123,
		uuid: 'uuid2',
		type: PayloadTypes.refresh,
		iss: 'iss',
		aud: 'aud',
		role: 'role',
		sub: 'sub',
		userId: 1,
		userName: 'username',
	},
	newAccess: {
		exp: 12312312312312312,
		nbf: 123,
		iat: 123,
		uuid: 'uuid3',
		type: PayloadTypes.access,
		iss: 'iss',
		aud: 'aud',
		role: 'role',
		sub: 'sub',
		userId: 1,
		userName: 'username',
	},
};

const brokenPayload = {
	exp: 123,
	nbf: 123,
	iat: 123,
	uuid: 'uuid1',
	type: PayloadTypes.access,

	iss: 'iss',
	aud: 'aud',
	role: 'role',
	sub: 'sub',
	userId: 1,
};

export class MockJWTAuthService {
	signAccessToken = jest.fn();
	signRefreshToken = jest.fn();
	verify = jest.fn();
	isExpired = jest.fn();
}

export class MockTokenService {
	findOne = jest.fn();
	deleteOne = jest.fn();
	createOne = jest.fn();
}

describe('AuthService', () => {
	let service: AuthService;
	let mockJWTAuthService: MockJWTAuthService;
	let mockTokenService: MockTokenService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule],
			providers: [
				AuthService,
				{
					provide: DoubleJwtService,
					useClass: MockJWTAuthService,
				},
				{
					provide: TokenService,
					useClass: MockTokenService,
				},
			],
		}).compile();

		service = module.get(AuthService);
		mockJWTAuthService = module.get(DoubleJwtService);
		mockTokenService = module.get(TokenService);
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
		expect(mockJWTAuthService).toBeDefined();
		expect(mockTokenService).toBeDefined();
	});

	it('should define method', function () {
		expect(service.issueToken).toBeDefined();
		expect(service.refreshToken).toBeDefined();
		expect(service.revokeToken).toBeDefined();
		expect(service.verifyToken).toBeDefined();
	});

	describe('method verifyToken', function () {
		it('should success', async function () {
			const token = 'any token';
			const type = 'access token';
			const givenPayload = payloadFixtures.access;
			// given mock
			mockJWTAuthService.verify.mockReturnValue(givenPayload);

			mockTokenService.findOne.mockReturnValue(givenPayload);

			// when
			const payload = await service.verifyToken(token, type);

			// than
			expect(payload).toEqual(givenPayload);
		});

		it('should raise error, if malformed token', async function () {
			const token = 'any token';
			const type = 'access token';

			// given mock
			mockJWTAuthService.verify.mockReturnValue(brokenPayload);

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid custom claims in access token token',
				);
			}
		});

		it('should raise error, if token is invalid signature', async function () {
			const token = 'any token';
			const type = 'access token';

			// given mock
			mockJWTAuthService.verify.mockReturnValue(brokenPayload);

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid custom claims in access token token',
				);
			}
		});

		it('should raise error, if any invalid custom claims', async function () {
			const token = 'any token';
			const type = 'access token';

			// given mock
			mockJWTAuthService.verify.mockReturnValue(brokenPayload);

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid custom claims in access token token',
				);
			}
		});

		it('should raise error, if token is not found in storage', async function () {
			// given args

			const token = 'any token';
			const type = 'access token';
			const payload = payloadFixtures.access;

			// given mock
			mockJWTAuthService.verify.mockReturnValue(payload);

			mockTokenService.findOne.mockReturnValue(null);

			try {
				// when
				const payload = await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'access token token is not found in token storage',
				);
			}
		});

		it('should raise error, if token is not same with stored payload', async function () {
			// given args
			const token = 'any token';
			const type = 'access token';

			// given mock
			mockJWTAuthService.verify.mockReturnValue(payloadFixtures.access);

			mockTokenService.findOne.mockReturnValue({ a: 1 });

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'payload is not same with stored payload',
				);
			}
		});

		it('should raise error, if raise error from jwtService.verify', async function () {
			// given

			const token = 'any token';
			const type = 'access token';

			// given mock
			mockJWTAuthService.verify.mockImplementation(() => {
				throw new MalformedJWTError('malformed');
			});

			try {
				// when
				const payload = await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid access token token of malformed',
				);
			}
		});
	});

	describe('method issueToken', function () {
		it('should success', async function () {
			// given mockJWTAuthService
			const accessToken = 'access token';
			const refreshToken = 'refresh token';
			mockJWTAuthService.signAccessToken.mockReturnValue([
				'access token',
				'1',
			]);
			mockJWTAuthService.signRefreshToken.mockReturnValue([
				'refresh token',
				'2',
			]);

			// given dto
			const dto = new IssueTokenDto();
			dto.username = 'root';
			dto.password = 'pass';

			//when
			const res: IssueTokenResponse = await service.issueToken(dto);

			//than
			expect(res.tokenType).toBe(tokenType);
			expect(res.expiredIn).toBe(expiredIn);
			expect(res.accessToken).toBe(accessToken);
			expect(res.refreshToken).toBe(refreshToken);
		});

		it('raise error if invalid user', async function () {
			// given dto
			const dto = new IssueTokenDto();
			dto.username = 'root1234';
			dto.password = 'pass';

			try {
				//when
				await service.issueToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
			}
		});
	});

	describe('method refreshToken', function () {
		it('should success', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given new access token
			const newAccessToken = 'new access token';

			// given payloads
			const accessPayload = payloadFixtures.access;
			const refreshPayload = payloadFixtures.refresh;

			// given mock jwt service mock
			mockJWTAuthService.verify.mockImplementation((token) => {
				if (token === accessToken) {
					return accessPayload;
				}

				if (token === refreshToken) {
					return refreshPayload;
				}

				expectShouldNotCallThis();
			});

			const newPayload = payloadFixtures.newAccess;

			mockJWTAuthService.isExpired.mockReturnValue(false);

			mockJWTAuthService.signAccessToken.mockReturnValue([
				newAccessToken,
				newPayload,
			]);

			// given mock token service
			// return stored payload
			mockTokenService.findOne.mockImplementation((uuid) => {
				if (uuid === accessPayload.uuid) {
					return accessPayload;
				}

				if (uuid === refreshPayload.uuid) {
					return refreshPayload;
				}

				expectShouldNotCallThis();
			});

			// delete old payload
			mockTokenService.deleteOne.mockImplementation((uuid) => {
				if (uuid === accessPayload.uuid) {
					return;
				}

				expectShouldNotCallThis();
			});

			// create new payload
			mockTokenService.createOne.mockImplementation((dto) => {
				if (_.isEqual(dto, newPayload)) {
					return;
				}

				expectShouldNotCallThis();
			});

			// when
			const res: RefreshTokenResponse = await service.refreshToken(dto);

			//than return response dto
			const expectationResult: RefreshTokenResponse = {
				refreshToken: refreshToken,
				accessToken: newAccessToken,
				tokenType: 'bearer',
				expiresIn: 3600,
			};
			expect(res).toEqual(expectationResult);

			// than call mock token service
			expect(mockTokenService.deleteOne.mock.calls.length).toBe(1);
			expect(mockTokenService.createOne.mock.calls.length).toBe(1);
			expect(mockTokenService.findOne.mock.calls.length).toBe(2);
		});

		// case of refresh token and payload problem
		it('should raise error, if raise MalformedJWTError from verify refresh token ', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw
			mockJWTAuthService.verify.mockImplementation((token) => {
				if (token === refreshToken) {
					throw new MalformedJWTError('malformed');
				}
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe('invalid refresh token of malformed');
				expect(mockJWTAuthService.verify.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if raise invalidSignatureError from verify refresh token ', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw
			mockJWTAuthService.verify.mockImplementation((token) => {
				if (token === refreshToken) {
					throw new InvalidJWTSignatureError('invalid signature');
				}
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid refresh token of invalid signature',
				);
			}
		});

		it('should raise error, if invalid refresh payload', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw AuthenticationError
			service.verifyToken = jest
				.fn()
				.mockImplementation((token, type) => {
					expect(token).toEqual(refreshToken);

					if (type === 'refresh') {
						const errors = [];
						throw new AuthenticationError(
							`invalid custom claims in ${type} token`,
							errors,
						);
					}

					expectShouldNotCallThis();
				});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid custom claims in refresh token',
				);
			}
		});

		it('should raise error, if refresh payload is not found in storage', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw AuthenticationError
			service.verifyToken = jest
				.fn()
				.mockImplementation((token, type) => {
					expect(token).toEqual(refreshToken);

					if (type === 'refresh') {
						throw new AuthenticationError(
							`${type} token is not found in token storage`,
						);
					}

					expectShouldNotCallThis();
				});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'refresh token is not found in token storage',
				);
			}
		});

		it('should raise error, if refresh payload is not same as stored payload', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw AuthenticationError
			service.verifyToken = jest
				.fn()
				.mockImplementation((token, type) => {
					expect(token).toEqual(refreshToken);

					if (type === 'refresh') {
						throw new AuthenticationError(
							'payload is not same with stored payload',
						);
					}

					expectShouldNotCallThis();
				});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'payload is not same with stored payload',
				);
			}
		});

		it('should raise error, if expired refresh token', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock method of service
			const mockMethod_verifyToken = jest
				.fn()
				.mockImplementation((token) => {
					if (token === refreshToken) {
						return payloadFixtures.expiredRefresh;
					}

					expectShouldNotCallThis();
				});
			service.verifyToken = mockMethod_verifyToken;

			// given mock jwt service

			mockJWTAuthService.isExpired.mockImplementation((payload) => {
				if (payload === payloadFixtures.expiredRefresh) {
					return true;
				}
				expectShouldNotCallThis();
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe('expired refresh token');

				expect(mockMethod_verifyToken.mock.calls.length).toBe(1);
				expect(mockJWTAuthService.isExpired.mock.calls.length).toBe(1);
			}
		});

		// case of access token and payload problem
		it('should raise error, if raise MalformedJWTError from verify access token ', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw
			// given mock method verifyToken
			const verifyToken = jest.fn().mockImplementation((token, type) => {
				if (token === refreshToken) {
					return payloadFixtures.refresh;
				}

				if (token === accessToken) {
					throw new AuthenticationError(
						`invalid ${type} token of malformed`,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			mockJWTAuthService.isExpired = jest
				.fn()
				.mockImplementation((payload) => {
					if (payload === payloadFixtures.refresh) {
						return false;
					}

					expectShouldNotCallThis();
				});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe('invalid access token of malformed');
				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockJWTAuthService.isExpired.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if raise invalidSignatureError from verify access token ', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock method verifyToken
			const verifyToken = jest.fn().mockImplementation((token, type) => {
				if (token === refreshToken) {
					return payloadFixtures.refresh;
				}

				if (token === accessToken) {
					throw new AuthenticationError(
						`invalid ${type} token of InvalidSignatureError`,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock jwt service
			mockJWTAuthService.isExpired.mockImplementation((payload) => {
				if (payload === payloadFixtures.refresh) {
					return false;
				}

				expectShouldNotCallThis();
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'invalid access token of InvalidSignatureError',
				);

				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockJWTAuthService.isExpired.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if invalid custom claims of access payload', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock method verifyToken
			const verifyToken = jest.fn().mockImplementation((token, type) => {
				if (token === refreshToken) {
					return payloadFixtures.refresh;
				}

				if (token === accessToken) {
					const errors = [];
					throw new AuthenticationError(
						`invalid custom claims in ${type} token`,
						errors,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock jwt service
			mockJWTAuthService.isExpired.mockImplementation((payload) => {
				if (payload === payloadFixtures.refresh) {
					return false;
				}

				expectShouldNotCallThis();
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe('invalid custom claims in access token');

				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockJWTAuthService.isExpired.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if access payload is not found in storage', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock method verifyToken
			const verifyToken = jest.fn().mockImplementation((token, type) => {
				if (token === refreshToken) {
					return payloadFixtures.refresh;
				}

				if (token === accessToken) {
					const errors = [];
					throw new AuthenticationError(
						`${type} token is not found in token storage`,
						errors,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock jwt service
			mockJWTAuthService.isExpired.mockImplementation((payload) => {
				if (payload === payloadFixtures.refresh) {
					return false;
				}

				expectShouldNotCallThis();
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'access token is not found in token storage',
				);

				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockJWTAuthService.isExpired.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if access payload is not same as stored payload', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock method verifyToken
			const verifyToken = jest.fn().mockImplementation((token, type) => {
				if (token === refreshToken) {
					return payloadFixtures.refresh;
				}

				if (token === accessToken) {
					const errors = [];
					throw new AuthenticationError(
						'payload is not same with stored payload',
						errors,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock jwt service
			mockJWTAuthService.isExpired.mockImplementation((payload) => {
				if (payload === payloadFixtures.refresh) {
					return false;
				}

				expectShouldNotCallThis();
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				// than expect error
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe(
					'payload is not same with stored payload',
				);

				// than expect call mock
				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockJWTAuthService.isExpired.mock.calls.length).toBe(1);
			}
		});
	});

	describe('method revokeToken', function () {
		it('should success', async function () {
			assert(false);
		});

		it('should raise error, if refresh token is malformed', async function () {
			assert(false);
		});

		it('should raise error, if refresh token is invalid signature', async function () {
			assert(false);
		});

		it('should raise error, if refresh payload is not found in storage', async function () {
			assert(false);
		});

		it('should raise error, if refresh payload is not same as stored', async function () {
			assert(false);
		});

		it('should raise error, if access token is malformed', async function () {
			assert(false);
		});

		it('should raise error, if access token is invalid signature', async function () {
			assert(false);
		});

		it('should raise error, if access payload is not found in storage', async function () {
			assert(false);
		});

		it('should raise error, if access payload is not same as stored', async function () {
			assert(false);
		});
	});
});
