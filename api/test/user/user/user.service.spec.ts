import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { RepositoryMock } from 'test/lib/mock/repository.mock';

describe('UserService', () => {
	let service: UserService;
	let repository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: RepositoryMock,
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
});
