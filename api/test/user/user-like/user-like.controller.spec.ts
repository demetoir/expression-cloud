import { Test, TestingModule } from '@nestjs/testing';
import { UserLikeController } from '../../../src/user/user-like/user-like.controller';
import { UserLikeService } from '../../../src/user/user-like/user-like.service';
import { MockUserLikeService } from './user-like.service.mock';

describe('UserLike Controller', () => {
	let controller: UserLikeController;
	let service: MockUserLikeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserLikeController],
			providers: [
				{ provide: UserLikeService, useClass: MockUserLikeService },
			],
		}).compile();

		controller = module.get<UserLikeController>(UserLikeController);
		service = module.get(UserLikeService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});
});
