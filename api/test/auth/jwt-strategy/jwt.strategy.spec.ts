import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../src/auth/jwt-strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { DoubleJwtService } from '../../../src/auth/double-jwt/double-jwt.service';
import { MockDoubleJWTService } from '../../../src/auth/double-jwt/double-jwt.service.mock';
import { ITokenPayload } from '../../../src/auth/double-jwt/token/interface';
import { DoubleJWTValidationError } from '../../../src/auth/double-jwt/error';

describe('JwtStrategy', () => {
	let strategy: JwtStrategy;
	let mockDoubleJwtService: DoubleJwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PassportModule],
			providers: [
				JwtStrategy,
				{
					provide: DoubleJwtService,
					useClass: MockDoubleJWTService,
				},
			],
		}).compile();

		strategy = module.get(JwtStrategy);
		mockDoubleJwtService = module.get(DoubleJwtService);
	});

	it('should be DI', () => {
		expect(strategy).toBeDefined();
		expect(mockDoubleJwtService).toBeDefined();
	});

	it('should define method', function () {
		expect(strategy.validate).toBeDefined();
	});

	describe('validate method', function () {
		it('should return user, if success', async function () {
			// given
			const payload: ITokenPayload = {
				aud: '',
				exp: 0,
				iat: 0,
				iss: '',
				nbf: 0,
				role: '',
				sub: '',
				type: undefined,
				userId: 0,
				userName: '',
				uuid: '',
			};

			const mockFn = jest.fn();
			mockDoubleJwtService.verifyPayload = mockFn;

			// when
			const result = await strategy.validate(payload);

			// than
			expect(result).toBeDefined();
			expect(result).toBe(payload);
			expect(mockFn.mock.calls.length).toBe(1);
			expect(mockFn.mock.calls[0]).toEqual([payload]);
		});

		it('should return null, if service raise DoubleJWTValidationError', async function () {
			// given
			const payload: ITokenPayload = {
				aud: '',
				exp: 0,
				iat: 0,
				iss: '',
				nbf: 0,
				role: '',
				sub: '',
				type: undefined,
				userId: 0,
				userName: '',
				uuid: '',
			};

			const mockFn = jest.fn().mockImplementation(() => {
				throw new DoubleJWTValidationError();
			});
			mockDoubleJwtService.verifyPayload = mockFn;

			//when
			const result = await strategy.validate(payload);

			// than
			expect(result).toBeDefined();
			expect(result).toBe(null);

			expect(mockFn.mock.calls.length).toBe(1);
			expect(mockFn.mock.calls[0]).toEqual([payload]);
		});

		it('should raise error, if raise any other error from service', async function () {
			// given
			const payload: ITokenPayload = {
				aud: '',
				exp: 0,
				iat: 0,
				iss: '',
				nbf: 0,
				role: '',
				sub: '',
				type: undefined,
				userId: 0,
				userName: '',
				uuid: '',
			};

			const mockFn = jest.fn().mockImplementation(() => {
				throw new TypeError();
			});
			mockDoubleJwtService.verifyPayload = mockFn;

			//when
			try {
				await strategy.validate(payload);
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(TypeError);
				expect(mockFn.mock.calls.length).toBe(1);
				expect(mockFn.mock.calls[0]).toEqual([payload]);
			}
		});
	});
});
