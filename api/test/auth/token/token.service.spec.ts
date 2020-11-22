import { Test, TestingModule } from '@nestjs/testing';
import { LocalStorageService } from 'src/auth/double-jwt/token/local-storage.service';
import { TokenService } from 'src/auth/double-jwt/token/token.service';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { ITokenPayload } from 'src/auth/double-jwt/token/interface';

describe('TokenService', () => {
	let service: TokenService;
	let localStorageService: LocalStorageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [],
			providers: [LocalStorageService, TokenService],
			exports: [TokenService],
		}).compile();

		service = module.get(TokenService);
		localStorageService = module.get(LocalStorageService);
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
	});

	it('should define method', function () {
		expect(service.createOne).toBeDefined();
		expect(service.deleteOne).toBeDefined();
		expect(service.findOne).toBeDefined();
	});

	describe('createOne', function () {
		it('should success', async function () {
			// given
			const payload: ITokenPayload = {
				userName: 'string',
				role: 'string',
				userId: 1,
			};
			const uuid = '123';

			// when
			await service.createOne(payload, uuid);

			// than
			expect(localStorageService.storage[uuid]).toBeDefined();
			expect(localStorageService.storage[uuid]).toEqual(payload);
		});

		it('raise error, if key already exist', async function () {
			// given
			const payload: ITokenPayload = {
				userName: 'string',
				role: 'string',
				userId: 1,
			};

			const otherPayload: ITokenPayload = {
				userName: 'string',
				role: 'string',
				userId: 2,
			};
			const uuid = '123';

			localStorageService.storage[uuid] = otherPayload;

			// when
			try {
				await service.createOne(payload, uuid);

				expectShouldNotCallThis();
			} catch (e) {
				// than

				expect(e.message).toBe(`obj already exist of ${uuid}`);
			}
		});
	});

	describe('deleteOne', function () {
		it('should success', async function () {
			// given
			const payload: ITokenPayload = {
				userName: 'string',
				role: 'string',
				userId: 1,
			};

			const uuid = '123';

			localStorageService.storage[uuid] = payload;

			// when
			await service.deleteOne(uuid);

			// than
			expect(localStorageService.storage[uuid]).not.toBeDefined();
		});

		it('raise error, if not exist', async function () {
			// given
			const uuid = '123';

			// when
			try {
				await service.deleteOne(uuid);
			} catch (e) {
				// than
				expect(e.message).toBe(`not exist obj of ${uuid}`);
			}
		});
	});

	describe('findOne', function () {
		it('return payload, if exist', async function () {
			// given
			const payload: ITokenPayload = {
				userName: 'string',
				role: 'string',
				userId: 1,
			};

			const uuid = '123';

			localStorageService.storage[uuid] = payload;

			// when
			const res = await service.findOne(uuid);

			// than
			expect(res).toEqual(payload);
		});

		it('return null, if not exist', async function () {
			// given
			const uuid = '123';

			// when
			const res = await service.findOne(uuid);

			// than
			expect(res).toEqual(null);
		});
	});
});
