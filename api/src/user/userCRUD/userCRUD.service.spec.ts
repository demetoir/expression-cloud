import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDService } from './userCRUD.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../common/model/entity/user.entity';
import { MockRepository } from '../../../test/lib/MockRepository';

describe('UserService', () => {
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

	it('should be defined method', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});
});
