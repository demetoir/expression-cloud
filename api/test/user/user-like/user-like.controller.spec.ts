import { Test, TestingModule } from '@nestjs/testing';
import { UserLikeController } from 'src/user-like/user-like.controller';
import { UserLikeService } from 'src/user-like/user-like.service';
import { MockUserLikeService } from './user-like.service.mock';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { CRUDRequestMockBuilder } from 'test/lib/mock/CRUDRequest.MockBuilder';
import { UserLikeEntity } from 'src/user-like/user-like.entity';
import { QueryFailedError } from 'typeorm';
import { MysqlErrorCodes } from 'mysql-error-codes';
import { DatabaseConstraintFailError } from 'src/common/error/database-constraint-fail.error';
import { AnyOtherError } from 'test/lib/error/any-other.error';

describe('UserLike Controller', () => {
	let controller: UserLikeController;
	let service: MockUserLikeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserLikeController],
			providers: [
				{ provide: UserLikeService, useClass: MockUserLikeService },
			],
		}).compile();

		controller = module.get<UserLikeController>(UserLikeController);
		service = module.get(UserLikeService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	describe('method getMany', () => {
		it('should call this.base.getMany', async function () {
			// given
			const req = CRUDRequestMockBuilder.build();
			const expectedResult = {};
			service.getMany.mockImplementation(() => {
				return expectedResult;
			});

			// when
			const result = await controller.getMany(req);

			// than
			expect(result).toEqual(expectedResult);
			expect(service.getMany.mock.calls.length).toBe(1);
			expect(service.getMany.mock.calls[0]).toEqual([req]);
		});
	});

	describe('method createOne', () => {
		it('should call this.base.createOne', async function () {
			// given
			const req = CRUDRequestMockBuilder.build();
			const entity = new UserLikeEntity();

			const stored = new UserLikeEntity();

			service.createOne.mockImplementation(() => {
				return stored;
			});

			//when
			const result = await controller.createOne(req, entity);

			//than
			expect(result).toEqual(stored);
			expect(service.createOne.mock.calls.length).toBe(1);
			expect(service.createOne.mock.calls[0]).toEqual([req, entity]);
		});

		it('raise DatabaseConstraintFailError, if service raise QueryFailedError because of ER_NO_REFERENCED_ROW_2', async function () {
			// given
			const req = CRUDRequestMockBuilder.build();
			const entity = new UserLikeEntity();

			service.createOne = jest.fn().mockImplementation(() => {
				const error = new QueryFailedError(
					'dummy query',
					[],
					new AnyOtherError(),
				);

				error['errno'] = MysqlErrorCodes.ER_NO_REFERENCED_ROW_2;

				throw error;
			});

			//when
			try {
				await controller.createOne(req, entity);

				expectShouldNotCallThis();
			} catch (e) {
				//than
				expect(e).toBeInstanceOf(DatabaseConstraintFailError);
				expect(service.createOne.mock.calls.length).toBe(1);
				expect(service.createOne.mock.calls[0]).toEqual([req, entity]);
			}
		});

		it('raise error throw pass, if any other error raise', async function () {
			// given
			const req = CRUDRequestMockBuilder.build();
			const entity = new UserLikeEntity();

			service.createOne.mockImplementation(() => {
				throw new AnyOtherError();
			});

			//when
			try {
				await controller.createOne(req, entity);
				expectShouldNotCallThis();
			} catch (e) {
				//than
				expect(e).toBeInstanceOf(AnyOtherError);

				expect(service.createOne.mock.calls.length).toBe(1);
				expect(service.createOne.mock.calls[0]).toEqual([req, entity]);
			}
		});
	});

	describe('method deleteOne', () => {
		it('should call this.base.deleteOne', async function () {
			// given
			const req = CRUDRequestMockBuilder.build();

			const stored = new UserLikeEntity();

			service.deleteOne.mockImplementation(() => {
				return stored;
			});

			//when
			const result = await controller.deleteOne(req);

			//than
			expect(result).toEqual(stored);
			expect(service.deleteOne.mock.calls.length).toBe(1);
			expect(service.deleteOne.mock.calls[0]).toEqual([req]);
		});

		it('raise error, if any other error raise', async function () {
			// given
			const req = CRUDRequestMockBuilder.build();
			service.deleteOne.mockImplementation(() => {
				throw new AnyOtherError();
			});

			try {
				// when
				await controller.deleteOne(req);

				expectShouldNotCallThis();
			} catch (e) {
				// than
				expect(e).toBeInstanceOf(AnyOtherError);
				expect(service.deleteOne.mock.calls.length).toBe(1);
				expect(service.deleteOne.mock.calls[0]).toEqual([req]);
			}
		});
	});
});
