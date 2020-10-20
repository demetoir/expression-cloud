import { Test, TestingModule } from '@nestjs/testing';
import { UserSettingController } from 'src/user-setting/user-setting.controller';

describe('UserCRUD Controller', () => {
	let controller: UserSettingController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserSettingController],
		}).compile();

		controller = module.get<UserSettingController>(UserSettingController);
	});

	it('should be defined controller', () => {
		expect(controller).toBeDefined();
	});

	it('should be defined methods', () => {
		expect(controller.getOne).toBeDefined();
		expect(controller.updateOne).toBeDefined();
		expect(controller.updateOnePartial).toBeDefined();
	});
});
