import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDController } from './userCRUD.controller';

describe('UserCRUD Controller', () => {
	let controller: UserCRUDController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserCRUDController],
		}).compile();

		controller = module.get<UserCRUDController>(UserCRUDController);
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
		const params = {
			id: 1,
		};
		const body = {};

		const response = await controller.createOne(params, body);

		expect(response).toEqual('create user');
	});
});
