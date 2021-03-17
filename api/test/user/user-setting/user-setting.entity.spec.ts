import { assert } from 'chai';
import { Connection, EntityManager, Repository } from 'typeorm';
import { UserSetting } from 'src/user/user-setting';
import { getConnectionForTest } from 'test/util/typeorm';
import { UserFactory } from '../user/user.factory';

const database = 'user_setting_entity';
describe('user-setting entity', () => {
	let connection: Connection;
	let userSettingRepository: Repository<UserSetting>;
	let manager: EntityManager;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		userSettingRepository = connection.getRepository(UserSetting);
		manager = connection.manager;
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		expect(connection).toBeDefined();
		expect(userSettingRepository).toBeDefined();
		expect(manager).toBeDefined();
	});

	it('should create new user-setting', async () => {
		const userSetting = new UserSetting();
		await manager.save(userSetting);

		const newUserSetting = await userSettingRepository.findOne({
			id: userSetting.id,
		});

		assert.isNotNull(newUserSetting);
	});

	describe('properties', () => {
		it('should have userId', async () => {
			const user = UserFactory.build();
			await manager.save(user);

			const userSetting = new UserSetting();
			userSetting.userId = user.id;

			await manager.save(userSetting);

			const stored = await userSettingRepository.findOne(userSetting.id);
			expect(stored.userId).toBe(user.id);
		});

		it('userId should nullable true', async () => {
			const userSetting = new UserSetting();
			userSetting.userId = null;

			await manager.save(userSetting);

			const stored = await userSettingRepository.findOne(userSetting.id);
			expect(stored.userId).toBe(null);
		});
	});

	describe('relation', () => {
		let userSetting;

		it('should prepare user-setting', async () => {
			userSetting = new UserSetting();

			await connection.manager.save(userSetting);
		});

		it('should relate with user entity', async () => {
			const user = UserFactory.build();
			await connection.manager.save(user);

			user.setting = Promise.resolve(userSetting);
			await connection.manager.save(user);

			userSetting.user = Promise.resolve(user);
			await connection.manager.save(userSetting);

			const stored = await userSettingRepository.findOne({
				where: { id: userSetting.id },
				relations: ['user'],
			});

			assert.equal(stored.user.id, user.id);
			expect(stored.userId).toBe(user.id);
		});
	});
});
