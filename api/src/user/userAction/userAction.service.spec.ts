import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../userRepository/user.repository';
import { UserActionService } from './userAction.service';
import { MockRepository } from '../../../test/lib/mock/MockRepository';
import { UserEntity } from '../../common/model/entity/user.entity';

describe('UserActionService', () => {
	let service: UserActionService;
	let repository: Repository<UserRepository>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserActionService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(UserActionService);

		repository = module.get(getRepositoryToken(UserEntity));
	});

	it('should be defined method', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});
});
