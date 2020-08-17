import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

describe('JwtStrategy', () => {
	let strategy: JwtStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PassportModule],
			providers: [JwtStrategy],
		}).compile();

		strategy = module.get(JwtStrategy);
	});

	it('should be DI', () => {
		expect(strategy).toBeDefined();
	});

	it('should define method', function () {
		expect(strategy.validate).toBeDefined();
	});

	describe('validate', function () {
		it('should validate', function () {});
	});
});
