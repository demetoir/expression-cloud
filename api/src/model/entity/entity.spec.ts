import { createConnection } from 'typeorm';
import ormconfig from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';
import { NoticeEntity } from './notices.entity';
import { UserSettingEntity } from './userSetting.entity';

describe('entity define', () => {
	beforeEach(async () => {
		console.log('before each');
	});

	describe('root', () => {
		it('should return "Hello World!"', async () => {
			const connection = await createConnection(ormconfig);
			console.log('here');
			const user = new UserEntity();
			user.name = 'Me and Bears';
			user.description = 'I am near polar bears';
			user.email = 'email';
			await connection.manager.save(user);

			console.log(user);
			return;

			const userRepository = connection.getRepository(UserEntity);
			const userSettingRepository = connection.getRepository(
				UserSettingEntity,
			);
			const roleRepository = connection.getRepository(RoleEntity);
			const noticeRepository = connection.getRepository(NoticeEntity);

			const result = await userRepository.find();
			console.log(result);

			console.log('Photo has been saved');

			const userSetting = new UserSettingEntity();
			userSetting.user = Promise.resolve(user);
			await connection.manager.save(userSetting);

			user.setting = Promise.resolve(userSetting);
			await connection.manager.save(user);

			const result1 = await userRepository.findOne({
				id: user.id,
			});
			console.log(result1);
			console.log(await result1.setting);

			const result2 = await userSettingRepository.find();
			console.log(result2);

			const adminRole = new RoleEntity();
			adminRole.name = 'admin';
			await connection.manager.save(adminRole);

			const userRole = new RoleEntity();
			userRole.name = 'user';
			await connection.manager.save(userRole);

			user.roles = [adminRole, userRole];
			await connection.manager.save(user);

			const result3 = await userRepository.findOne({
				id: user.id,
			});
			console.log(result3);

			const notice1 = new NoticeEntity();
			notice1.content = 'content';
			// notice1.user = user
			await connection.manager.save(notice1);

			const notice2 = new NoticeEntity();
			notice2.content = ' contesnt';
			notice2.user = user;
			await connection.manager.save(notice2);

			console.log('fwesfsef');

			console.log(user);

			const result6 = await userRepository.find({
				relations: ['notices'],
			});
			console.log(result6);

			const result5 = await userRepository
				.createQueryBuilder('user')
				.leftJoin('user.notices', 'notice')
				.getMany();
			console.log(result5);

			connection.close();
			console.log('heloow shit');
		});
	});
});
