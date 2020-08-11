import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../userRepository/user.repository';
import { UserActionService } from './userAction.service';
import { MockRepository } from '../../../test/lib/mock/MockRepository';

describe('UserActionService', () => {
	let service: UserActionService;
	let repository: Repository<UserRepository>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserActionService,
				{
					provide: getRepositoryToken(UserRepository),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(UserActionService);

		repository = module.get(getRepositoryToken(UserRepository));
	});

	it('should be defined method', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});
});
