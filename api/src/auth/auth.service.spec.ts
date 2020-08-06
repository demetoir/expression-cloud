import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { JWTAuthModule } from './JWTAuth/JWTAuth.module';

describe('AuthService', () => {
	let service: AuthService;
	const secret = 'secret';

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule, JWTAuthModule],
			providers: [AuthService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
