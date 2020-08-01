import { Test, TestingModule } from '@nestjs/testing';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../../../test/lib/MockRepository';
import { UserEntity } from '../../common/model/entity/user.entity';

describe('UserCRUD Controller', () => {
	let controller: UserCRUDController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserCRUDController],

			providers: [
				UserCRUDService,

				{
					provide: getRepositoryToken(UserEntity),
					useClass: MockRepository,
				},
			],
		}).compile();

		controller = module.get(UserCRUDController);
	});

	it('should be defined controller', () => {
		expect(controller).toBeDefined();
	});
});
