import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDService } from './userCRUD.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../user.repository';

class MockRepository {
	public create(user: any) {
		return user;
	}
}

describe('UserService', () => {
	let service: UserCRUDService;
	let repository: Repository<UserRepository>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserCRUDService,
				{
					provide: getRepositoryToken(UserRepository),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(UserCRUDService);

		repository = module.get(getRepositoryToken(UserRepository));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(service.getOne).toBeDefined();
		expect(service.getMany).toBeDefined();
		expect(service.createOne).toBeDefined();
		expect(service.updateOne).toBeDefined();
		expect(service.updateOnePartial).toBeDefined();
		expect(service.deleteOne).toBeDefined();
	});

	it('should getOne', () => {});

	it('should createOne', async () => {
		const body = {
			name: 'name',
			description: 'description',
			email: 'email',
		};
		const user = await service.createOne(body);

		// expect(user).toBe(body);
	});
});
