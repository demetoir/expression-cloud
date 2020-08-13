import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { JWTAuthModule } from './JWTAuth/JWTAuth.module';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule, JWTAuthModule],
			providers: [AuthService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
	});

	it('should define method', function () {
		expect(service.issueToken).toBeDefined();
		expect(service.refreshToken).toBeDefined();
		expect(service.revokeToken).toBeDefined();
	});

	describe('method issueToken', function () {});

	describe('method refreshToken', function () {});

	describe('method revokeToken', function () {});
});
