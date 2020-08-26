import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth/auth.controller';
import { LocalAuthModule } from '../../../src/auth/localAuth/localAuth.module';
import { AuthService } from '../../../src/auth/auth/auth.service';
import { IssueTokenDto } from '../../../src/auth/auth/dto/issue-token.dto';
import { IssueTokenResponse } from '../../../src/auth/auth/dto/issue-token.response.interface';
import { RefreshTokenDto } from '../../../src/auth/auth/dto/refresh-token.dto';
import { RefreshTokenResponse } from '../../../src/auth/auth/dto/refreshToken.response.interface';
import { RevokeTokenDto } from '../../../src/auth/auth/dto/revoke-token.dto';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticationError } from '../../../src/auth/auth/error';
import { expectShouldNotCallThis } from '../../lib/helper/jestHelper';
import { MockAuthService } from './auth.service.mock';

describe('Auth Controller', () => {
	let controller: AuthController;
	let service: MockAuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule],
			providers: [
				{
					provide: AuthService,
					useClass: MockAuthService,
				},
			],
			controllers: [AuthController],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get(AuthService);
	});

	it('should be DI', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	it('should define method', function () {
		expect(controller.issueToken).toBeDefined();
		expect(controller.login).toBeDefined();
		expect(controller.refreshToken).toBeDefined();
		expect(controller.revokeToken).toBeDefined();
		expect(controller.whoAmI).toBeDefined();
	});

	describe('method issue token', function () {
		it('should success', async function () {
			const responseDto: IssueTokenResponse = {
				refreshToken: 'refreshToken',
				accessToken: 'accessToken',
				expiredIn: 3600,
				tokenType: 'bearer',
			};

			// given dto
			const dto = new IssueTokenDto();
			dto.username = 'user';
			dto.password = 'password';

			// given mockService
			service.issueToken.mockImplementation((reqDto) => {
				if (reqDto === dto) {
					return responseDto;
				}

				expectShouldNotCallThis();
			});

			// when
			const res: IssueTokenResponse = await controller.issueToken(dto);

			//than
			expect(res).toBeDefined();
			expect(res).toEqual(responseDto);

			expect(service.issueToken.mock.calls.length).toBe(1);
		});

		it('should raise error, if service raise AuthenticationError', async function () {
			// given dto
			const dto = new IssueTokenDto();
			dto.username = 'user';
			dto.password = 'password';

			// given mockService
			service.issueToken.mockImplementation((reqDto) => {
				if (reqDto === dto) {
					throw new AuthenticationError('shit');
				}

				expectShouldNotCallThis();
			});
			try {
				// when
				await controller.issueToken(dto);
			} catch (e) {
				//than
				expect(e).toBeInstanceOf(UnauthorizedException);
				expect(e.message).toBe('shit');

				expect(service.issueToken.mock.calls.length).toBe(1);
			}
		});

		it('should raise error, if service raise other error', async function () {
			// given dto
			const dto = new IssueTokenDto();
			dto.username = 'user';
			dto.password = 'password';

			// given mockService
			service.issueToken.mockImplementation((reqDto) => {
				if (reqDto === dto) {
					throw new TypeError('shit');
				}

				expectShouldNotCallThis();
			});
			try {
				// when
				await controller.issueToken(dto);
			} catch (e) {
				//than
				expect(e).toBeInstanceOf(TypeError);
				expect(e.message).toBe('shit');

				expect(service.issueToken.mock.calls.length).toBe(1);
			}
		});
	});

	describe('method refresh token', function () {
		it('should success', async function () {
			const refreshToken = 'refresh';
			const accessToken = 'access';
			const newAccessToken = 'new access';

			// given dto
			const dto = new RefreshTokenDto();
			dto.refreshToken = refreshToken;
			dto.accessToken = accessToken;

			const expectResponse: RefreshTokenResponse = {
				refreshToken: refreshToken,
				accessToken: newAccessToken,
				expiredIn: 3600,
				tokenType: 'bearer',
			};

			service.refreshToken.mockImplementation(() => {
				return expectResponse;
			});

			// when
			const res: RefreshTokenResponse = await controller.refreshToken(
				dto,
			);

			//than
			expect(res).toEqual(expectResponse);
			expect(service.refreshToken.mock.calls.length).toEqual(1);
		});

		it('raise error, if catch AuthenticationError and raise UnauthorizedException', async function () {
			const refreshToken = 'refresh';
			const accessToken = 'access';

			// given dto
			const dto = new RefreshTokenDto();
			dto.refreshToken = refreshToken;
			dto.accessToken = accessToken;

			service.refreshToken.mockImplementation(() => {
				throw new AuthenticationError('shit');
			});

			try {
				await controller.refreshToken(dto);
				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(UnauthorizedException);
				expect(e.message).toEqual('shit');
				expect(service.refreshToken.mock.calls.length).toBe(1);
			}
		});

		it('raise error, if raise rest error from auth service', async function () {
			const refreshToken = 'refresh';
			const accessToken = 'access';

			// given dto
			const dto = new RefreshTokenDto();
			dto.refreshToken = refreshToken;
			dto.accessToken = accessToken;

			service.refreshToken.mockImplementation(() => {
				throw new Error('shit');
			});

			try {
				await controller.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(Error);
				expect(e.message).toEqual('shit');
				expect(service.refreshToken.mock.calls.length).toBe(1);
			}
		});
	});

	describe('method revoke token', function () {
		it('should success', async function () {
			// todo: implement this
			// given mock service
			service.revokeToken.mockReturnValue(null);

			// given dto
			const dto = new RevokeTokenDto();

			// when
			await controller.revokeToken(dto);

			// than
		});
	});

	describe('method login', function () {});

	describe('method whoami', function () {});
});
