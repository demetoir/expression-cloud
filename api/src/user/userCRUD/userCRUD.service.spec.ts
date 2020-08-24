import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDService } from './userCRUD.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { MockRepository } from '../../../test/lib/mock/MockRepository';

describe('UserCRUDService', () => {
	let service: UserCRUDService;
	let repository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserCRUDService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(UserCRUDService);

		repository = module.get(getRepositoryToken(UserEntity));
	});

	it('should be DI for init', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});
});
