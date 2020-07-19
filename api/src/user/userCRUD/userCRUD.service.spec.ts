import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDService } from './userCRUD.service';

describe('UserService', () => {
	let service: UserCRUDService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserCRUDService],
		}).compile();

		service = module.get<UserCRUDService>(UserCRUDService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
