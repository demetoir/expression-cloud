import { Test, TestingModule } from '@nestjs/testing';
import { UserOauthService } from 'src/user/user-oauth/user-oauth.service';

describe('UserOauthService', () => {
	let service: UserOauthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserOauthService],
		}).compile();

		service = module.get<UserOauthService>(UserOauthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
