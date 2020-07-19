import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../userRepository/user.repository';

class MockRepository {
	public create(user: any) {
		return user;
	}
}

describe('UserCRUD Controller', () => {
	let controller: UserCRUDController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserCRUDController],

			providers: [
				UserCRUDService,

				{
					provide: getRepositoryToken(UserRepository),
					useClass: MockRepository,
				},
			],
		}).compile();

		controller = module.get(UserCRUDController);
	});

	it('should be defined controller', () => {
		expect(controller).toBeDefined();
	});

	it('should be defined methods', () => {
		expect(controller.createOne).toBeDefined();
		expect(controller.deleteOne).toBeDefined();
		expect(controller.getMany).toBeDefined();
		expect(controller.getOne).toBeDefined();
		expect(controller.updateOne).toBeDefined();
	});

	it('should run method createUser', async () => {
		const body = {
			name: 'name',
			email: 'email',
			description: 'description',
		};

		const response = await controller.createOne(body);

		expect(response).toEqual(body);
	});
});
