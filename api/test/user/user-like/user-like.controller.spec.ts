import { Test, TestingModule } from '@nestjs/testing';
import { UserLikeController } from '../../../src/user/user-like/user-like.controller';
import { UserLikeService } from '../../../src/user/user-like/user-like.service';
import { MockUserService } from '../../../src/user/user/user.controller.spec';
import { MockUserLikeService } from '../../lib/mock/user-like.service.mock';

describe('UserLike Controller', () => {
	let controller: UserLikeController;
	let service: MockUserService;

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
