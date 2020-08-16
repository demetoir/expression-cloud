import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { RevokeTokenResponseDto } from './dto/revokeToken.response.dto';
import { IssueTokenDto } from './dto/issue-token.dto';
import { IssueTokenResponse } from './dto/issue-token.response.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenResponse } from './dto/refreshToken.response.interface';

export class MockAuthService {
	issueToken = jest.fn();
	refreshToken = jest.fn();
	revokeToken = jest.fn();
}

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
			// given mockService
			const responseDto: IssueTokenResponse = {
				refreshToken: 'refreshToken',
				accessToken: 'accessToken',
				expiredIn: 3600,
				tokenType: 'bearer',
			};

			service.issueToken.mockReturnValue(responseDto);

			// given dto
			const dto = new IssueTokenDto();

			// when
			const res: IssueTokenResponse = await controller.issueToken(dto);

			//than

			expect(res).toBeDefined();
			expect(res).toEqual(responseDto);
		});

		it('should rate limit', function () {});
	});

	describe('method refresh token', function () {
		it('should success', async function () {
			// todo: implement this

			// given mock service
			service.refreshToken.mockReturnValue(null);

			// given dto
			const dto = new RefreshTokenDto();

			// when
			const res: RefreshTokenResponse = await controller.refreshToken(
				dto,
			);

			//than
			expect(res).toBeDefined();
		});

		it('raise error if refreshToken is broken', function () {});

		it('raise error if refreshToken is expired', function () {});

		it('raise error if token not exist in header', function () {});
	});

	describe('method revoke token', function () {
		it('should success', async function () {
			// todo: implement this
			// given mock service
			service.revokeToken.mockReturnValue(null);

			// given dto
			const dto = new RevokeTokenResponseDto();

			// when
			const res: RevokeTokenResponseDto = await controller.revokeToken(
				dto,
			);

			// than
			expect(res).toBeDefined();
		});
	});

	describe('method login', function () {});

	describe('method whoami', function () {});
});
