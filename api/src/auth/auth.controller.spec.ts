import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { JWTAuthModule } from './JWTAuth/JWTAuth.module';

describe('Auth Controller', () => {
	let controller: AuthController;
	let service: AuthService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule, JWTAuthModule],
			providers: [AuthService],
			controllers: [AuthController],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);
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

	describe('method issue token', function () {});

	describe('method refresh token', function () {});

	describe('method revoke token', function () {});

	describe('method login', function () {});

	describe('method whoami', function () {});
});
