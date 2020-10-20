import { Test, TestingModule } from '@nestjs/testing';
import { UserLikeService } from 'src/user-like/user-like.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryMock } from 'test/lib/mock/repository.mock';
import { UserLikeEntity } from 'src/user-like/user-like.entity';
import { Repository } from 'typeorm';

describe('UserLikeService', () => {
	let service: UserLikeService;
	let repository: Repository<UserLikeEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserLikeService,
				{
					provide: getRepositoryToken(UserLikeEntity),
					useClass: RepositoryMock,
				},
			],
		}).compile();

		service = module.get(UserLikeService);
		repository = module.get(getRepositoryToken(UserLikeEntity));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});

	it('should define method', () => {
		expect(service.createOne).toBeDefined();
		expect(service.getMany).toBeDefined();
		expect(service.deleteOne).toBeDefined();
	});
});
