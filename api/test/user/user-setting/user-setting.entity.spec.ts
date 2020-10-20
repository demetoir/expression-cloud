import { assert } from 'chai';
import { Connection, EntityManager, Repository } from 'typeorm';
import { UserSettingEntity } from 'src/user-setting/user-setting.entity';
import { getConnection } from 'test/resource/typeorm';
import { UserFactory } from '../user/user.factory';

describe('user-setting entity', () => {
	let connection: Connection;
	let userSettingRepository: Repository<UserSettingEntity>;
	let manager: EntityManager;

	beforeAll(async () => {
		connection = await getConnection();
		userSettingRepository = connection.getRepository(UserSettingEntity);
		manager = connection.manager;
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		expect(connection).toBeDefined();
		expect(userSettingRepository).toBeDefined();
		expect(manager).toBeDefined();
	});

	it('should create new user-setting', async function () {
		const userSetting = new UserSettingEntity();
		await manager.save(userSetting);

		const newUserSetting = await userSettingRepository.findOne({
			id: userSetting.id,
		});

		assert.isNotNull(newUserSetting);
	});

	describe('properties', () => {
		it('should have userId', async function () {
			const user = UserFactory.build();
			await manager.save(user);

			const userSetting = new UserSettingEntity();
			userSetting.userId = user.id;

			await manager.save(userSetting);

			const stored = await userSettingRepository.findOne(userSetting.id);
			expect(stored.userId).toBe(user.id);
		});

		it('userId should nullable true', async function () {
			const userSetting = new UserSettingEntity();
			userSetting.userId = null;

			await manager.save(userSetting);

			const stored = await userSettingRepository.findOne(userSetting.id);
			expect(stored.userId).toBe(null);
		});
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

			const stored = await userSettingRepository.findOne({
				where: { id: userSetting.id },
				relations: ['user'],
			});

			assert.equal(stored.user.id, user.id);
			expect(stored.userId).toBe(user.id);
		});
	});
});
