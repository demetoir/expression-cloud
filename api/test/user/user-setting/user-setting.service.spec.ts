import { Test, TestingModule } from '@nestjs/testing';
import { UserSettingService } from '../../../src/user/user-setting/user-setting.service';

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
