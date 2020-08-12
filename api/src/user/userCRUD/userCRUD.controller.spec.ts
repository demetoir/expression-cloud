import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';
import { MockCrudService } from '../../../test/lib/mock/CrudService.mock';

describe('UserCRUD Controller', () => {
	let controller: UserCRUDController;
	let service: MockCrudService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserCRUDController],
			providers: [
				{
					provide: UserCRUDService,
					useClass: MockCrudService,
				},
			],
		}).compile();

		controller = module.get(UserCRUDController);
		service = module.get(UserCRUDService);
	});

	it('should be create by DI', function () {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	it('should be define CRUD method', () => {
		expect(controller.getOne).toBeDefined();
		expect(controller.getMany).toBeDefined();
		expect(controller.createOne).toBeDefined();
		expect(controller.createMany).toBeDefined();
		expect(controller.updateOne).toBeDefined();
		expect(controller.replaceOne).toBeDefined();
		expect(controller.deleteOne).toBeDefined();
	});
});
