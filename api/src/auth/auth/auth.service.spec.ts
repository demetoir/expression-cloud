import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { expectShouldNotCallThis } from '../../../test/lib/helper/jestHelper';
import { IssueTokenDto } from './dto/issue-token.dto';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { DoubleJwtService } from '../double-jwt/double-jwt.service';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { DoubleJWTValidationError } from '../double-jwt/error';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import { AuthenticationError } from './error';
import { MockDoubleJWTService } from '../double-jwt/double-jwt.service.mock';

const expiredIn = 3600;
const tokenType = 'bearer';

describe('AuthService', () => {
	let service: AuthService;
	let mockDoubleJWTService: MockDoubleJWTService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: DoubleJwtService,
					useClass: MockDoubleJWTService,
				},
			],
		}).compile();

		service = module.get(AuthService);
		mockDoubleJWTService = module.get(DoubleJwtService);
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
		expect(mockDoubleJWTService).toBeDefined();
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

			mockDoubleJWTService.issueToken.mockReturnValue({
				tokenType,
				accessToken,
				refreshToken,
				expiredIn,
			});

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
				expect(mockDoubleJWTService.issueToken.mock.calls.length).toBe(
					0,
				);
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

			// given mock double jwr service mock
			mockDoubleJWTService.refreshToken.mockImplementation(() => {
				return {
					accessToken: newAccessToken,
					refreshToken,
					expiredIn,
					tokenType,
				};
			});

			// when
			const res: RefreshTokenResponse = await service.refreshToken(dto);

			//than return response dto
			const expectationResult: RefreshTokenResponse = {
				refreshToken: refreshToken,
				accessToken: newAccessToken,
				tokenType: 'bearer',
				expiredIn: 3600,
			};
			expect(res).toEqual(expectationResult);
		});

		// case of refresh token and payload problem
		it('should raise error, if raise DoubleJWTValidationError from refreshToken ', async function () {
			// given token
			const accessToken = 'access';
			const refreshToken = 'refresh';

			// given dto
			const dto = new RefreshTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			// given mock, throw
			mockDoubleJWTService.refreshToken.mockImplementation(() => {
				throw new DoubleJWTValidationError();
			});

			try {
				// when
				await service.refreshToken(dto);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);
				expect(
					mockDoubleJWTService.refreshToken.mock.calls.length,
				).toBe(1);

				expect(
					mockDoubleJWTService.refreshToken.mock.calls[0],
				).toEqual([dto]);
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

			await service.revokeToken(dto);

			expect(mockDoubleJWTService.revokeToken.mock.calls.length).toBe(1);
			expect(mockDoubleJWTService.revokeToken.mock.calls[0]).toEqual([
				dto,
			]);
		});

		it('should raise error, if verifyToken raise error by access token', async function () {
			const accessToken = 'accessToken';
			const refreshToken = 'refreshToken';
			const dto = new RevokeTokenDto();
			dto.accessToken = accessToken;
			dto.refreshToken = refreshToken;

			mockDoubleJWTService.revokeToken.mockImplementation(() => {
				throw new DoubleJWTValidationError();
			});

			try {
				await service.revokeToken(dto);
			} catch (e) {
				expect(e).toBeInstanceOf(DoubleJWTValidationError);

				expect(mockDoubleJWTService.revokeToken.mock.calls.length).toBe(
					1,
				);
				expect(mockDoubleJWTService.revokeToken.mock.calls[0]).toEqual([
					dto,
				]);
			}
		});
	});
});
