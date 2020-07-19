import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDService } from '../userCRUD/userCRUD.service';
import { UserSettingService } from './userSetting.service';

describe('UserSettingService', () => {
	let service: UserSettingService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserSettingService],
		}).compile();

		service = module.get<UserSettingService>(UserSettingService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
