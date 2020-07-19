import { Test, TestingModule } from '@nestjs/testing';
import { UserActionController } from './userAction.controller';

describe('UserCRUD Controller', () => {
	let controller: UserActionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserActionController],
		}).compile();

		controller = module.get<UserActionController>(UserActionController);
	});

	it('should be defined controller', () => {
		expect(controller).toBeDefined();
	});

	it('should be defined methods', () => {
		expect(controller.like).toBeDefined();
		expect(controller.undoLike).toBeDefined();
	});

	it('should run method like', async () => {
		const response = await controller.like();

		expect(response).toEqual('like user');
	});

	it('should run method undoLike', async () => {
		const response = await controller.undoLike();

		expect(response).toEqual('undo like user');
	});
});
