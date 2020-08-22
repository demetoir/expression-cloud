import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { UserSettingEntity } from './user-setting.entity';

describe('userSetting entity', () => {
	let connection;
	let userSettingRepository;
	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userSettingRepository = connection.getRepository(UserSettingEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(userSettingRepository);
	});

	it('should create new userSetting', async function () {
		const userSetting = new UserSettingEntity();
		await connection.manager.save(userSetting);

		const newUserSetting = await userSettingRepository.findOne({
			id: userSetting.id,
		});

		assert.isNotNull(newUserSetting);
	});

	describe('relation', () => {
		let userSetting;

		it('should prepare userSetting', async () => {
			userSetting = new UserSettingEntity();

			await connection.manager.save(userSetting);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.setting = Promise.resolve(userSetting);
			await connection.manager.save(user);

			userSetting.user = Promise.resolve(user);
			await connection.manager.save(userSetting);

			const resultUserSetting = await userSettingRepository.findOne({
				where: { id: userSetting.id },
				relations: ['user'],
			});

			assert.equal(resultUserSetting.user.id, user.id);
		});
	});
});
