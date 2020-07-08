import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('User Controller', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined controller', () => {
		expect(controller).toBeDefined();
	});

	it('should be defined methods', () => {
		expect(controller.createUser).toBeDefined();
		expect(controller.deleteUser).toBeDefined();
		expect(controller.getManyUsers).toBeDefined();
		expect(controller.getUser).toBeDefined();
		expect(controller.updateUser).toBeDefined();
	});

	it('should run method createUser', async () => {
		const params = {
			id: 1,
		};
		const body = {};

		const response = await controller.createUser(params, body);

		expect(response).toEqual('create user');
	});
});
