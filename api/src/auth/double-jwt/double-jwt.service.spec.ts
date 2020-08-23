import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import { CustomJwtService } from './custom-jwt/custom-jwt.service';
import { PayloadTypes } from './custom-jwt/interface';
import { DoubleJwtService } from './double-jwt.service';
import { TokenService } from './token/token.service';
import {
	InvalidJWTSignatureError,
	MalformedJWTError,
} from './custom-jwt/error';
import { expectShouldNotCallThis } from '../../../test/lib/helper/jestHelper';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RevokeTokenDto } from '../dto/revoke-token.dto';
import { ITokenPayload } from './token/interface';
import { DoubleJWTValidationError } from './error';

const expiredIn = 3600;

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

export class MockCustomJWTService {
	verify = jest.fn();
	isExpired = jest.fn();
	sign = jest.fn();
}

export class MockTokenService {
	findOne = jest.fn();
	deleteOne = jest.fn();
	createOne = jest.fn();
}

describe('doubleJwtService', () => {
	let service: DoubleJwtService;
	let mockCustomJwtService: MockCustomJWTService;
	let mockTokenService: MockTokenService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DoubleJwtService,
				{
					provide: CustomJwtService,
					useClass: MockCustomJWTService,
				},
				{
					provide: TokenService,
					useClass: MockTokenService,
				},
			],
		}).compile();

		service = module.get(DoubleJwtService);
		mockCustomJwtService = module.get(CustomJwtService);
		mockTokenService = module.get(TokenService);
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
		expect(mockCustomJwtService).toBeDefined();
		expect(mockTokenService).toBeDefined();
	});

	it('should define method', function () {
		expect(service.issueToken).toBeDefined();
		expect(service.refreshToken).toBeDefined();
		expect(service.revokeToken).toBeDefined();
		expect(service.verifyToken).toBeDefined();
		expect(service.verifyPayload).toBeDefined();
	});

	describe('method verifyToken', function () {
		it('should success', async function () {
			const token = 'any token';
			const type = 'access token';
			const givenPayload = payloadFixtures.access;

			// given mock
			mockCustomJwtService.verify.mockReturnValue(givenPayload);

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
			mockCustomJwtService.verify.mockImplementation(() => {
				throw new MalformedJWTError('malformed');
			});

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe(
					'invalid access token token of malformed',
				);
			}
		});

		it('should raise error, if token is invalid signature', async function () {
			const token = 'any token';
			const type = 'access token';

			// given mock
			mockCustomJwtService.verify.mockImplementation(() => {
				throw new InvalidJWTSignatureError('invalid JWT');
			});

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe(
					'invalid access token token of invalid JWT',
				);
			}
		});

		it('should raise error, if any invalid custom claims', async function () {
			const token = 'any token';
			const type = 'access token';

			// given mock
			mockCustomJwtService.verify.mockReturnValue(brokenPayload);

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
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
			mockCustomJwtService.verify.mockReturnValue(payload);

			mockTokenService.findOne.mockReturnValue(null);

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
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
			mockCustomJwtService.verify.mockImplementation(
				() => payloadFixtures.access,
			);

			mockTokenService.findOne.mockReturnValue({ a: 1 });

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe(
					'payload is not same with stored payload',
				);
			}
		});

		it('should raise error, if raise any error from jwtService.verify', async function () {
			// given

			const token = 'any token';
			const type = 'access token';

			// given mock
			mockCustomJwtService.verify.mockImplementation(() => {
				throw new TypeError('shit');
			});

			try {
				// when
				await service.verifyToken(token, type);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError);
				expect(e.message).toBe('shit');
			}
		});
	});

	describe('method issueToken', function () {
		it('should success', async function () {
			// given mockJWTAuthService
			const accessToken = 'access token';
			const refreshToken = 'refresh token';
			mockCustomJwtService.sign.mockImplementation(
				(payload, type, duration) => {
					if (type === PayloadTypes.access) {
						return ['access token', '1'];
					}

					if (type === PayloadTypes.refresh) {
						return ['refresh token', '2'];
					}

					expectShouldNotCallThis();
				},
			);

			// given dto
			const username = 'root';

			const payload: ITokenPayload = {
				role: 'user',
				userName: username,
				userId: 1,
			};
			//when
			const res = await service.issueToken(payload);

			//than
			expect(res.expiredIn).toBe(expiredIn);
			expect(res.accessToken).toBe(accessToken);
			expect(res.refreshToken).toBe(refreshToken);
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

			// given mock custom-jwt service mock
			mockCustomJwtService.verify.mockImplementation((token) => {
				if (token === accessToken) {
					return accessPayload;
				}

				if (token === refreshToken) {
					return refreshPayload;
				}

				expectShouldNotCallThis();
			});

			const newPayload = payloadFixtures.newAccess;

			mockCustomJwtService.isExpired.mockReturnValue(false);

			mockCustomJwtService.sign.mockReturnValue([
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
			const res = await service.refreshToken(dto);

			//than return response dto
			const expectationResult = {
				refreshToken: refreshToken,
				accessToken: newAccessToken,
				expiredIn: 3600,
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
			mockCustomJwtService.verify.mockImplementation((token) => {
				if (token === refreshToken) {
					throw new MalformedJWTError('malformed');
				}
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe('invalid refresh token of malformed');
				expect(mockCustomJwtService.verify.mock.calls.length).toBe(1);
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
			mockCustomJwtService.verify.mockImplementation((token) => {
				if (token === refreshToken) {
					throw new InvalidJWTSignatureError('invalid signature');
				}
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
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

			// given mock, throw DoubleJWTValidationError
			service.verifyToken = jest
				.fn()
				.mockImplementation((token, type) => {
					expect(token).toEqual(refreshToken);

					if (type === 'refresh') {
						const errors = [];
						throw new DoubleJWTValidationError(
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
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

			// given mock, throw DoubleJWTValidationError
			service.verifyToken = jest
				.fn()
				.mockImplementation((token, type) => {
					expect(token).toEqual(refreshToken);

					if (type === 'refresh') {
						throw new DoubleJWTValidationError(
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
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

			// given mock, throw DoubleJWTValidationError
			service.verifyToken = jest
				.fn()
				.mockImplementation((token, type) => {
					expect(token).toEqual(refreshToken);

					if (type === 'refresh') {
						throw new DoubleJWTValidationError(
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
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

			// given mock custom-jwt service

			mockCustomJwtService.isExpired.mockImplementation((payload) => {
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe('expired refresh token');

				expect(mockMethod_verifyToken.mock.calls.length).toBe(1);
				expect(mockCustomJwtService.isExpired.mock.calls.length).toBe(
					1,
				);
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
					throw new DoubleJWTValidationError(
						`invalid ${type} token of malformed`,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			mockCustomJwtService.isExpired = jest
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe('invalid access token of malformed');
				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockCustomJwtService.isExpired.mock.calls.length).toBe(
					1,
				);
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
					throw new DoubleJWTValidationError(
						`invalid ${type} token of InvalidSignatureError`,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock custom-jwt service
			mockCustomJwtService.isExpired.mockImplementation((payload) => {
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe(
					'invalid access token of InvalidSignatureError',
				);

				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockCustomJwtService.isExpired.mock.calls.length).toBe(
					1,
				);
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
					throw new DoubleJWTValidationError(
						`invalid custom claims in ${type} token`,
						errors,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock custom-jwt service
			mockCustomJwtService.isExpired.mockImplementation((payload) => {
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe('invalid custom claims in access token');

				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockCustomJwtService.isExpired.mock.calls.length).toBe(
					1,
				);
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
					throw new DoubleJWTValidationError(
						`${type} token is not found in token storage`,
						errors,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock custom-jwt service
			mockCustomJwtService.isExpired.mockImplementation((payload) => {
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe(
					'access token is not found in token storage',
				);

				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockCustomJwtService.isExpired.mock.calls.length).toBe(
					1,
				);
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
			const verifyToken = jest.fn().mockImplementation((token) => {
				if (token === refreshToken) {
					return payloadFixtures.refresh;
				}

				if (token === accessToken) {
					const errors = [];
					throw new DoubleJWTValidationError(
						'payload is not same with stored payload',
						errors,
					);
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			// given mock custom-jwt service
			mockCustomJwtService.isExpired.mockImplementation((payload) => {
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
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe(
					'payload is not same with stored payload',
				);

				// than expect call mock
				expect(verifyToken.mock.calls.length).toBe(2);
				expect(mockCustomJwtService.isExpired.mock.calls.length).toBe(
					1,
				);
			}
		});
	});

	describe('method revokeToken', function () {
		it('should success', async function () {
			const accessToken = 'accessToken';
			const refreshToken = 'refreshToken';
			const dto = new RevokeTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			const accessPayload = { a: 1, uuid: 1 };
			const refreshPayload = { b: 2, uuid: 2 };

			const verifyToken = jest.fn().mockImplementation((token) => {
				if (token === refreshToken) {
					return refreshPayload;
				}

				if (token === accessToken) {
					return accessPayload;
				}

				expectShouldNotCallThis();
			});
			service.verifyToken = verifyToken;

			mockTokenService.deleteOne.mockImplementation((uuid) => {
				if (_.isEqual(uuid, accessPayload.uuid)) {
					return;
				}

				if (_.isEqual(uuid, refreshPayload.uuid)) {
					return;
				}

				expectShouldNotCallThis();
			});

			await service.revokeToken(dto);

			expect(verifyToken.mock.calls.length).toBe(2);
			expect(mockTokenService.deleteOne.mock.calls.length).toBe(2);
			expect(mockTokenService.deleteOne.mock.calls).toEqual([
				[refreshPayload.uuid],
				[accessPayload.uuid],
			]);
		});

		it('should raise error, if verifyToken raise error by refresh token', async function () {
			const accessToken = 'accessToken';
			const refreshToken = 'refreshToken';
			const dto = new RevokeTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			const verifyToken = jest.fn().mockImplementation((token) => {
				if (token === refreshToken) {
					throw new DoubleJWTValidationError(
						'refresh token is malformed',
					);
				}

				if (token === accessToken) {
					return null;
				}

				expectShouldNotCallThis();
			});

			service.verifyToken = verifyToken;
			try {
				await service.revokeToken(dto);
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe('refresh token is malformed');

				expect(verifyToken.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if verifyToken raise error by access token', async function () {
			const accessToken = 'accessToken';
			const refreshToken = 'refreshToken';
			const dto = new RevokeTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			const refreshPayload = 'refresh';

			const verifyToken = jest.fn().mockImplementation((token) => {
				if (token === refreshToken) {
					return refreshPayload;
				}

				if (token === accessToken) {
					throw new DoubleJWTValidationError(
						'refresh token is malformed',
					);
				}

				expectShouldNotCallThis();
			});

			service.verifyToken = verifyToken;
			try {
				await service.revokeToken(dto);
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(e.message).toBe('refresh token is malformed');

				expect(verifyToken.mock.calls.length).toBe(2);
			}
		});
	});

	describe('method verifyPayload', function () {
		it('should return void, if success', async () => {
			// given
			const payload = payloadFixtures.access;

			const findOneMock = jest.fn().mockImplementation((tokenUuid) => {
				if (tokenUuid === payload.uuid) {
					return payload;
				}

				expectShouldNotCallThis();
			});

			mockTokenService.findOne = findOneMock;
			// when
			await service.verifyPayload(payload);

			expect(findOneMock.mock.calls.length).toBe(1);
			expect(findOneMock.mock.calls[0]).toEqual([payload.uuid]);
		});
	});

	it('should raise error, if invalid custom claims in payload', async () => {
		//  given
		const payload = payloadFixtures.brokenAccess;

		try {
			// when
			await service.verifyPayload(payload);
		} catch (e) {
			// than
			expect(e).toBeInstanceOf(DoubleJWTValidationError);
			expect(e.message).toBe('invalid custom claims in payload');
		}
	});

	it('should return void, if payload is not found in storage', async () => {
		// given
		const payload = payloadFixtures.access;

		const findOneMock = jest.fn().mockImplementation((tokenUuid) => {
			if (tokenUuid === payload.uuid) {
				return null;
			}

			expectShouldNotCallThis();
		});

		mockTokenService.findOne = findOneMock;
		try {
			// when
			await service.verifyPayload(payload);
		} catch (e) {
			// than
			expect(e).toBeInstanceOf(DoubleJWTValidationError);
			expect(e.message).toBe('payload is not found in storage');

			expect(findOneMock.mock.calls.length).toBe(1);
			expect(findOneMock.mock.calls[0]).toEqual([payload.uuid]);
		}
	});

	it('should return void, if payload is not same with stored one', async () => {
		// given
		const payload = payloadFixtures.access;
		const otherPayload = payloadFixtures.newAccess;

		const findOneMock = jest.fn().mockImplementation((tokenUuid) => {
			if (tokenUuid === payload.uuid) {
				return otherPayload;
			}

			expectShouldNotCallThis();
		});

		mockTokenService.findOne = findOneMock;
		try {
			// when
			await service.verifyPayload(payload);
		} catch (e) {
			// than
			expect(e).toBeInstanceOf(DoubleJWTValidationError);
			expect(e.message).toBe('payload is not same with stored one');

			expect(findOneMock.mock.calls.length).toBe(1);
			expect(findOneMock.mock.calls[0]).toEqual([payload.uuid]);
		}
	});
});
