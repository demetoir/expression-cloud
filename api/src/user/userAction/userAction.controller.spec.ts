import { Test, TestingModule } from '@nestjs/testing';
import { UserActionController } from './userAction.controller';
import { UserActionService } from './userAction.service';

class MockService {
	public async like(): Promise<string> {
		return 'like user';
	}

	public async undoLike(): Promise<string> {
		return 'undo like user';
	}
}

describe('UserCRUD Controller', () => {
	let controller: UserActionController;
	let service: UserActionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserActionController],
			providers: [{ provide: UserActionService, useClass: MockService }],
		}).compile();

		controller = module.get(UserActionController);
		service = module.get(UserActionService);
	});

	it('should be defined controller', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
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
