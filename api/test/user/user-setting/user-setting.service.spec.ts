import { Test, TestingModule } from '@nestjs/testing';
import { UserSettingService } from 'src/core/user/service/user-setting.service';
import { UserSettingServiceModule } from '../../../src/core';

describe('UserSettingService', () => {
	let service: UserSettingService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserSettingServiceModule],
		}).compile();

		service = module.get<UserSettingService>(UserSettingService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
