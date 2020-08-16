import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { IssueTokenRequestDto } from './dto/issueToken.request.dto';
import { IssueTokenResponseDto } from './dto/issueToken.response.dto';
import { DoubleJwtService } from './double-jwt/double-jwt.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../common/model/entity/user.entity';
import { MockRepository } from '../../test/lib/mock/MockRepository';
import { Repository } from 'typeorm';
import { UserRepository } from '../user/userRepository/user.repository';
import { AuthenticationError } from './error';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import {
	InvalidJWTSignatureError,
	MalformedJWTError,
} from './double-jwt/error';
import assert from 'assert';
import { JWTType } from './interface';

const expiredIn = 3600;
const tokenType = 'bearer';

export class MockJWTAuthService {
	signAccessToken = jest.fn();
	signRefreshToken = jest.fn();
	verify = jest.fn();
}

describe('AuthService', () => {
	let service: AuthService;
	let mockJWTAuthService: MockJWTAuthService;
	let userRepository: Repository<UserRepository>;

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
					provide: getRepositoryToken(UserEntity),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(AuthService);
		mockJWTAuthService = module.get(DoubleJwtService);
		userRepository = module.get(getRepositoryToken(UserEntity));
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
		expect(mockJWTAuthService).toBeDefined();
		expect(userRepository).toBeDefined();
	});

	it('should define method', function () {
		expect(service.issueToken).toBeDefined();
		expect(service.refreshToken).toBeDefined();
		expect(service.revokeToken).toBeDefined();
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
			const dto = new IssueTokenRequestDto();
			dto.username = 'root';
			dto.password = 'pass';

			//when
			const res: IssueTokenResponseDto = await service.issueToken(dto);

			//than
			expect(res).toBeInstanceOf(IssueTokenResponseDto);

			expect(res.tokenType).toBe(tokenType);
			expect(res.expiredIn).toBe(expiredIn);
			expect(res.accessToken).toBe(accessToken);
			expect(res.refreshToken).toBe(refreshToken);
		});

		it('raise error if invalid user', async function () {
			// given dto
			const dto = new IssueTokenRequestDto();
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
		it('should refresh both token', function () {
			assert(false);

			// service.refreshToken();refreshToken
		});

		it('should success, even if access token is expired', async function () {
			// todo: add test
			assert(false);
		});

		it('should success, even if access token is not expired', async function () {
			// todo: add test
			assert(false);
		});

		it('raise error, if refresh token is broken', async function () {
			// given mockJWTAuthService and tokens
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
			mockJWTAuthService.verify.mockImplementation((_, type: JWTType) => {
				if (type === 'refreshToken') {
					throw new MalformedJWTError();
				}
			});

			try {
				//
				await service.refreshToken({
					refreshToken,
					accessToken,
				});
				// todo: add test

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError);
			}
		});

		it('raise error, if refresh token is expired', async function () {
			// given tokens
			const accessToken = 'access token';
			const refreshToken = 'refresh token';

			// given mock jwt auth service, raise error if validate refresh token
			mockJWTAuthService.verify.mockImplementation((_, type: JWTType) => {
				if (type === 'refreshToken') {
					throw new InvalidJWTSignatureError(
						'refresh token Invalid signature',
					);
				}
			});

			try {
				// when
				await service.refreshToken({
					refreshToken,
					accessToken,
				});

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe('refresh token Invalid signature');
			}
		});

		it('raise error, if refresh token is not found in token storage', async function () {
			// todo: add test
			assert(false);
		});

		it('raise error, if invalid custom claim in refresh token', async function () {
			// todo: add test
			assert(false);
		});

		it('raise error, if access token is broken', async function () {
			// given tokens
			const accessToken = 'access token';
			const refreshToken = 'refresh token';

			// given mock jwt auth service, raise error if validate access token
			mockJWTAuthService.verify.mockImplementation((_, type: JWTType) => {
				if (type === 'accessToken') {
					throw new MalformedJWTError('accessToken is broken');
				}
			});

			try {
				// when
				await service.refreshToken({
					refreshToken,
					accessToken,
				});

				expectShouldNotCallThis();
			} catch (e) {
				//than
				expect(e).toBeInstanceOf(AuthenticationError);
				expect(e.message).toBe('accessToken is broken');
			}
		});

		it('raise error, if access token is not found in token storage', async function () {
			// todo: add test
			assert(false);
		});

		it('raise error, if payload of access token and refresh token is not same', async function () {
			// todo: add test
			assert(false);
		});
	});

	describe('method revokeToken', function () {
		it('should success', async function () {
			//todo: add test
			assert(false);
		});
	});
});
