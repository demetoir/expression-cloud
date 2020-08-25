import { Test, TestingModule } from '@nestjs/testing';
import { UserLikeService } from '../../../src/user/user-like/user-like.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../../lib/mock/MockRepository';
import { UserLikeEntity } from '../../../src/user/user-like/user-like.entity';
import { Repository } from 'typeorm/index';

describe('UserLikeService', () => {
	let service: UserLikeService;
	let repository: Repository<UserLikeEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserLikeService,
				{
					provide: getRepositoryToken(UserLikeEntity),
					useClass: MockRepository,
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
