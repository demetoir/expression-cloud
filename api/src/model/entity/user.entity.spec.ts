import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';
import { NoticeEntity } from './notice.entity';
import { UserSettingEntity } from './userSetting.entity';
import { TeamEntity } from './team.entity';
import { EditHistoryEntity } from './editHistory.entity';

describe('user entity', () => {
	let userRepository;
	let userSettingRepository;
	let roleRepository;
	let noticeRepository;
	let connection;
	let teamRepository;
	let editHistoryEntity;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userRepository = connection.getRepository(UserEntity);
		userSettingRepository = connection.getRepository(UserSettingEntity);
		roleRepository = connection.getRepository(RoleEntity);
		noticeRepository = connection.getRepository(NoticeEntity);
		teamRepository = connection.getRepository(TeamEntity);
		editHistoryEntity = connection.getRepository(EditHistoryEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	beforeEach(async () => {});

	it('should able to get repository from connection manager', function() {
		assert.isNotNull(userRepository);
		assert.isNotNull(userRepository);
		assert.isNotNull(roleRepository);
		assert.isNotNull(noticeRepository);

		assert.isNotNull(teamRepository);
		assert.isNotNull(editHistoryEntity);
	});

	it('should create new user', async function() {
		const user = new UserEntity();
		user.name = 'Me and Bears';
		user.description = 'I am near polar bears';
		user.email = 'email';
		await connection.manager.save(user);

		const newUser = userRepository.findOne({ id: user.id });

		assert.isNotNull(newUser);
	});

	describe('check column', () => {
		it('should not null on name', async function() {
			try {
				const name = undefined;
				const description = 'description ';
				const email = 'email';

				const user = new UserEntity();
				user.name = name;
				user.description = description;
				user.email = email;
				await connection.manager.save(user);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.name',
				);
			}
		});

		it('should not null at email', async function() {
			try {
				const name = 'Me and Bears';
				const description = 'description ';
				const email = undefined;

				const user = new UserEntity();
				user.name = name;
				user.description = description;
				user.email = email;
				await connection.manager.save(user);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.email',
				);
			}
		});

		it('should not null on  description', async function() {
			try {
				const name = 'Me and Bears';
				const description = undefined;
				const email = 'email';

				const user = new UserEntity();
				user.name = name;
				user.description = description;
				user.email = email;
				await connection.manager.save(user);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.description',
				);
			}
		});
	});

	describe('relation', () => {
		let user;
		let anotherUser;

		it('should prepare user', async function() {
			user = new UserEntity();
			user.name = 'Me and Bears';
			user.description = 'I am near polar bears';
			user.email = 'email';
			await connection.manager.save(user);

			assert.isNotNull(user.id);

			anotherUser = new UserEntity();
			anotherUser.name = 'another';
			anotherUser.description = 'description';
			anotherUser.email = 'email';
			await connection;
		});

		it('should relate with role entity', async function() {
			const adminRole = new RoleEntity();
			adminRole.name = 'admin';
			await connection.manager.save(adminRole);

			assert.isNotNull(adminRole.id);

			const userRole = new RoleEntity();
			userRole.name = 'user';
			await connection.manager.save(userRole);

			assert.isNotNull(userRole.id);

			user.roles = [adminRole, userRole];
			await connection.manager.save(user);

			assert.deepEqual(user.roles, [adminRole, userRole]);
		});

		it('should relate with notice entity', async function() {
			const notice1 = new NoticeEntity();
			notice1.content = 'content';
			notice1.user = user;
			await connection.manager.save(notice1);
			assert.isNotNull(notice1.id);

			user.notices = [notice1];
			await connection.manager.save(user);

			const result6 = await userRepository.findOne({
				where: { id: user.id },
				relations: ['notices'],
			});

			assert.deepStrictEqual(result6.notices[0].id, notice1.id);
		});

		it('should relate with user setting entity', async function() {
			const userSetting = new UserSettingEntity();
			userSetting.user = Promise.resolve(user);
			await connection.manager.save(userSetting);

			user.setting = Promise.resolve(userSetting);
			await connection.manager.save(user);

			const result1 = await userRepository.findOne({
				id: user.id,
			});
			assert.isNotNull(await result1.setting);

			const result2 = await userSettingRepository.find({
				id: userSetting.id,
			});
			assert.isNotNull(result2);
		});

		it('should relate with team entity', async function() {
			const team = new TeamEntity();
			team.name = 'team 1';
			team.description = 'description';
			await connection.manager.save(team);

			user.teams = [team];
			await connection.manager.save(user);

			team.users = [user, anotherUser];
			await connection.manager.save(team);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['teams'],
			});

			assert.equal(resultUser.teams[0].id, team.id);
		});

		it('should relate with edit history entity', async function() {
			const editHistoryEntity = new EditHistoryEntity();
			editHistoryEntity.edit_type = 1;
			editHistoryEntity.refId = null;
			editHistoryEntity.refType = null;
			editHistoryEntity.user = user;
			await connection.manager.save(editHistoryEntity);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['editHistories'],
			});

			assert.equal(resultUser.editHistories[0].id, editHistoryEntity.id);
		});
	});
});
