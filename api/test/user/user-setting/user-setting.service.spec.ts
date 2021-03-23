import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSetting, UserSettingService } from '../../../src/core';
import { RepositoryMock } from '../../lib/mock/repository.mock';

describe('UserSettingService', () => {
	let service: UserSettingService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserSettingService,
				{
					provide: getRepositoryToken(UserSetting),
					useClass: RepositoryMock,
				},
			],
		}).compile();

		service = module.get<UserSettingService>(UserSettingService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
