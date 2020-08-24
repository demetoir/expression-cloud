import { Test, TestingModule } from '@nestjs/testing';
import { UserOauthController } from './user-oauth.controller';

describe('UserOauth Controller', () => {
	let controller: UserOauthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserOauthController],
		}).compile();

		controller = module.get<UserOauthController>(UserOauthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
