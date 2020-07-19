import { Test, TestingModule } from '@nestjs/testing';
import { UserActionService } from './userAction.service';

describe('UserActionService', () => {
	let service: UserActionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserActionService],
		}).compile();

		service = module.get<UserActionService>(UserActionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(service.like).toBeDefined();
		expect(service.undoLike).toBeDefined();
	});
});
