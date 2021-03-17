import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryMock } from 'test/lib/mock/repository.mock';
import { User, UserService } from 'src/core/user/user';

describe('UserService', () => {
	let service: UserService;
	let repository: Repository<User>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useClass: RepositoryMock,
				},
			],
		}).compile();

		service = module.get(UserService);

		repository = module.get(getRepositoryToken(User));
	});

	it('should be DI for init', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});
});
