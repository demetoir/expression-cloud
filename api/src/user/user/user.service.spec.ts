import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { MockRepository } from '../../../test/lib/mock/MockRepository';

describe('UserService', () => {
	let service: UserService;
	let repository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(UserService);

		repository = module.get(getRepositoryToken(UserEntity));
	});

	it('should be DI for init', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});

	it('should be defined method', () => {
		expect(service.like).toBeDefined();
		expect(service.undoLike).toBeDefined();
	});
});
