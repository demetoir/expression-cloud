import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';
import { NoticeEntity } from './notice.entity';
import { UserSettingEntity } from './userSetting.entity';
import { TeamEntity } from './team.entity';
import { EditHistoryEntity } from './editHistory.entity';
import { CommentEntity } from './comment.entity';
import { OauthEntity } from './oauth.entity';
import { ExpressionEntity } from './expression.entity';
import { UserProfileImageEntity } from './userProfileImage.entity';

describe('user entity', () => {
	let userRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userRepository = connection.getRepository(UserEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(userRepository);
	});

	it('should create new user', async function () {
		const user = new UserEntity();
		user.name = 'Me and Bears';
		user.description = 'I am near polar bears';
		user.email = 'email';
		await connection.manager.save(user);

		const newUser = await userRepository.findOne({ id: user.id });

		assert.isNotNull(newUser);
	});

	describe('check column type', () => {
		it('should not null on name', async function () {
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

		it('should not null at email', async function () {
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

		it('should not null on description', async function () {
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

		it('should not null on forkedCount', async function () {
			try {
				const name = 'Me and Bears';
				const description = 'description';
				const email = 'email';

				const user = new UserEntity();
				user.name = name;
				user.description = description;
				user.email = email;
				user.forkedCount = null;
				await connection.manager.save(user);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.forked_count',
				);
			}
		});

		it('should not null on like_count', async function () {
			try {
				const name = 'Me and Bears';
				const description = 'description';
				const email = 'email';

				const user = new UserEntity();
				user.name = name;
				user.description = description;
				user.email = email;
				user.likedCount = null;
				await connection.manager.save(user);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.liked_count',
				);
			}
		});

		it('should not null on isAnonymous', async function () {
			try {
				const name = 'Me and Bears';
				const description = 'description';
				const email = 'email';

				const user = new UserEntity();
				user.name = name;
				user.description = description;
				user.email = email;
				user.isAnonymous = null;
				await connection.manager.save(user);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.is_anonymous',
				);
			}
		});

		it('should be false on likedCount as default', async function () {
			const name = 'Me and Bears';
			const description = 'description';
			const email = 'email';

			const user = new UserEntity();
			user.name = name;
			user.description = description;
			user.email = email;
			await connection.manager.save(user);

			assert.equal(user.likedCount, 0);
		});

		it('should be false on isAnonymous as default', async function () {
			const name = 'Me and Bears';
			const description = 'description';
			const email = 'email';

			const user = new UserEntity();
			user.name = name;
			user.description = description;
			user.email = email;
			await connection.manager.save(user);

			assert.equal(user.forkedCount, 0);
		});

		it('should be false on isAnonymous as default', async function () {
			const name = 'Me and Bears';
			const description = 'description';
			const email = 'email';

			const user = new UserEntity();
			user.name = name;
			user.description = description;
			user.email = email;
			await connection.manager.save(user);

			assert.equal(user.isAnonymous, false);
		});
	});

	describe('relation', () => {
		let user;
		let anotherUser;

		async function getNewUser(): Promise<UserEntity> {
			const user = new UserEntity();
			user.name = 'Me and Bears';
			user.description = 'I am near polar bears';
			user.email = 'email';
			return await connection.manager.save(user);
		}

		it('should prepare user', async function () {
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

		it('should relate with role entity', async function () {
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

		it('should relate with notice entity', async function () {
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

		it('should relate with user setting entity', async function () {
			const userSetting = new UserSettingEntity();
			userSetting.user = user;
			await connection.manager.save(userSetting);

			user.setting = Promise.resolve(userSetting);
			await connection.manager.save(user);

			const result1 = await userRepository.findOne({
				id: user.id,
			});
			assert.isNotNull(await result1.setting);
		});

		it('should relate with team entity', async function () {
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

		it('should relate with edit history entity', async function () {
			const editHistoryEntity = new EditHistoryEntity();
			editHistoryEntity.editType = 1;
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

		it('should relate with project', async function () {
			const expression = new ExpressionEntity();
			expression.name = 'project';
			expression.description = 'description';
			expression.type = 1;
			expression.content = '1';
			await connection.manager.save(expression);

			expression.user = user;
			await connection.manager.save(expression);

			user.expressions = [expression];
			await connection.manager.save(user);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['expressions'],
			});

			assert.equal(resultUser.expressions[0].id, expression.id);
		});

		it('should relate with comments', async function () {
			const comment = new CommentEntity();
			comment.content = 'content';
			await connection.manager.save(comment);

			comment.user = user;
			await connection.manager.save(comment);

			user.comments = [comment];
			await connection.manager.save(user);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['comments'],
			});

			assert.equal(resultUser.comments[0].id, comment.id);
		});

		it('should relate with oauth', async function () {
			const oauth = new OauthEntity();
			oauth.type = 1;
			oauth.authId = 'id';

			await connection.manager.save(oauth);

			oauth.user = user;
			await connection.manager.save(oauth);

			user.oauth = oauth;
			await connection.manager.save(user);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['oauth'],
			});

			assert.equal(resultUser.oauth.id, oauth.id);
		});

		it('should relate like user', async function () {
			const user1 = await getNewUser();
			const user2 = await getNewUser();

			user1.likeToUsers = [user2];
			await connection.manager.save(user1);

			user2.likeFromUsers = [user1];
			await connection.manager.save(user2);

			const result1 = await userRepository.findOne({
				where: { id: user1.id },
				relations: ['likeToUsers'],
			});
			assert.equal(result1.likeToUsers[0].id, user2.id);

			const result2 = await userRepository.findOne({
				where: { id: user2.id },
				relations: ['likeFromUsers'],
			});
			assert.equal(result2.likeFromUsers[0].id, user1.id);
		});

		it('should relate with user profile image entity', async function () {
			const userProfileImage = new UserProfileImageEntity();

			await connection.manager.save(userProfileImage);

			userProfileImage.user = user;
			await connection.manager.save(userProfileImage);

			user.profileImage = userProfileImage;
			await connection.manager.save(user);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['profileImage'],
			});

			assert.equal(resultUser.profileImage.id, userProfileImage.id);
		});

		async function getNewExpressionEntity(): Promise<ExpressionEntity> {
			const expression = new ExpressionEntity();
			expression.type = 1;
			expression.name = 'name';
			expression.description = 'description';
			expression.content = 'content';

			return await connection.manager.save(expression);
		}

		it('should relate with like expression', async function () {
			const expression = await getNewExpressionEntity();

			user.likeToExpressions = [expression];
			await connection.manager.save(user);

			expression.likeFrom = [user];
			await connection.manager.save(expression);

			const resultUser = await userRepository.findOne({
				where: { id: user.id },
				relations: ['likeToExpressions'],
			});

			assert.equal(resultUser.likeToExpressions[0].id, expression.id);
		});
	});
});
