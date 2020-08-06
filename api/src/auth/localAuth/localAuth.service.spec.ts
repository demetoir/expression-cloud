import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalAuthService } from './localAuth.service';

describe('LocalAuthService', () => {
	let service: LocalAuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PassportModule],
			providers: [LocalStrategy, LocalAuthService],
			exports: [LocalAuthService],
		}).compile();

		service = module.get<LocalAuthService>(LocalAuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
