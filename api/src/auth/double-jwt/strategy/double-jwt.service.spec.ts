import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { expectShouldNotCallThis } from '../../../../test/lib/helper/jestHelper';

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

	describe('validate method', function () {
		it('should return user, if success', async function () {
			expectShouldNotCallThis();
			const payload = {};

			const result = await strategy.validate(payload);

			const expectedUser = {};
			expect(result).toBeDefined();
			expect(result).toBe(expectedUser);
		});

		it('should return null, if payload is not valid', async function () {
			expectShouldNotCallThis();

			const payload = {};

			const result = await strategy.validate(payload);

			const expectedUser = {};
			expect(result).toBeDefined();
			expect(result).toBe(expectedUser);
		});

		it('should raise error, if raise any error', async function () {
			expectShouldNotCallThis();

			const payload = {};

			const result = await strategy.validate(payload);

			const expectedUser = {};
			expect(result).toBeDefined();
			expect(result).toBe(expectedUser);
		});
	});
});
