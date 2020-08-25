import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MockCrudService } from '../../../test/lib/mock/CrudService.mock';

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
	});
});
