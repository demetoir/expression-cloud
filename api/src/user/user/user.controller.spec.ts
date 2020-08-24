import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MockCrudService } from '../../../test/lib/mock/CrudService.mock';
import { LikeActionDto } from './dto/likeAction.dto';

export class MockUserService extends MockCrudService {
	like = jest.fn();
	undoLike = jest.fn();
}

describe('UserCRUD Controller', () => {
	let controller: UserController;
	let service: MockUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useClass: MockUserService,
				},
			],
		}).compile();

		controller = module.get(UserController);
		service = module.get(UserService);
	});

	it('should be create by DI', function () {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	it('should be define CRUD method', () => {
		expect(controller.getOne).toBeDefined();
		expect(controller.getMany).toBeDefined();
		expect(controller.createOne).toBeDefined();
		expect(controller.createMany).toBeDefined();
		expect(controller.updateOne).toBeDefined();
		expect(controller.replaceOne).toBeDefined();
		expect(controller.deleteOne).toBeDefined();
		expect(controller.like).toBeDefined();
		expect(controller.undoLike).toBeDefined();
	});

	it('should run method like', async () => {
		// given
		const toUserId = 2;
		const dto: LikeActionDto = {
			fromUserId: 4,
		};

		service.like.mockImplementation(() => 'like user');

		// when
		const response = await controller.like(toUserId, dto);

		// than
		expect(response).toEqual('like user');

		expect(service.like.mock.calls.length).toBe(1);
		expect(service.like.mock.calls[0]).toEqual([toUserId, dto]);
	});

	it('should run method undoLike', async () => {
		// given
		const toUserId = 2;
		const dto: LikeActionDto = {
			fromUserId: 4,
		};

		service.undoLike.mockImplementation(() => 'undo like user');

		// when
		const response = await controller.undoLike(toUserId, dto);

		// than
		expect(response).toEqual('undo like user');
		expect(service.undoLike.mock.calls.length).toBe(1);
		expect(service.undoLike.mock.calls[0]).toEqual([toUserId, dto]);
	});
});
