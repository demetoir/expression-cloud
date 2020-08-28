import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { UserSettingEntity } from './user-setting.entity';
import { ormConfig } from '../../common/model/configLoader';
import { UserFactory } from '../../../test/user/user/user.factory';

describe('user-setting entity', () => {
	let connection;
	let userSettingRepository;
	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		userSettingRepository = connection.getRepository(UserSettingEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(userSettingRepository);
	});

	it('should create new user-setting', async function () {
		const userSetting = new UserSettingEntity();
		await connection.manager.save(userSetting);

		const newUserSetting = await userSettingRepository.findOne({
			id: userSetting.id,
		});

		assert.isNotNull(newUserSetting);
	});

	describe('relation', () => {
		let userSetting;

		it('should prepare user-setting', async () => {
			userSetting = new UserSettingEntity();

			await connection.manager.save(userSetting);
		});

		it('should relate with user entity', async () => {
			const user = UserFactory.build();
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
