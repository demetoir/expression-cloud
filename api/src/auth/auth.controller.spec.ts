import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { JWTAuthModule } from './JWTAuth/JWTAuth.module';

describe('Auth Controller', () => {
	let controller: AuthController;
	const secret = 'secret';

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule, JWTAuthModule],
			providers: [AuthService],
			controllers: [AuthController],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
