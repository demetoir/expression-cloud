import { assert } from 'chai';
import { Connection, QueryFailedError, Repository } from 'typeorm';
import { User } from 'src/user/model/user.entity';
import { NoticeEntity } from 'src/notice/notice.entity';
import { TeamEntity } from 'src/team/team.entity';
import { EditHistoryEntity } from 'src/history/edit-history.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserOauthEntity } from 'src/user-oauth/user-oauth.entity';
import { ExpressionEntity } from 'src/expression/expression/expression.entity';
import { UserSettingEntity } from 'src/user-setting/user-setting.entity';
import { RoleEntity } from 'src/role/role.entity';
import { UserProfileImageEntity } from 'src/user-profile-image/user-profile-image.entity';
import { UserLikeEntity } from 'src/user-like/user-like.entity';
import { RoleEnum } from 'src/role/role.enum';
import { getConnectionForTest } from 'test/util/typeorm';
import { UserFactory } from './user.factory';

const database = 'user_entity';
describe('user entity', () => {
	let userRepository: Repository<User>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		userRepository = connection.getRepository(User);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(userRepository);
	});

	it('should create new user', async function () {
		const user = UserFactory.build();

		await connection.manager.save(user);

		const newUser = await userRepository.findOne({ id: user.id });

		assert.isNotNull(newUser);
	});

	describe('check column constraint', () => {
		const name = 'Me and Bears';
		const description = 'description';
		const email = 'email';

		it('name should not be undefined', async function () {
			try {
				const user = UserFactory.build();
				user.name = undefined;

				await connection.manager.save(user);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`Field 'name' doesn't have a default value`,
				);
			}
		});

		it('email should default null, while it is undefined', async function () {
			const user = UserFactory.build();

			user.email = undefined;

			await connection.manager.save(user);

			const result = await userRepository.findOne({ id: user.id });

			assert.equal(result.email, null);
		});

		it('forkedCount should not be null', async function () {
			try {
				const user = UserFactory.build();
				user.forkedCount = null;

				await connection.manager.save(user);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'forked_count' cannot be null`);
			}
		});

		it('forkedCount should be 0 as default', async function () {
			const user = UserFactory.build();

			await connection.manager.save(user);

			assert.equal(user.forkedCount, 0);

			const result: User = await userRepository.findOne({
				id: user.id,
			});

			assert.equal(result.forkedCount, 0);
		});

		it('likeCount should be not null', async function () {
			try {
				const user = new User();
				user.name = name;
				user.description = description;
				user.email = email;
				user.likedCount = null;

				await connection.manager.save(user);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'liked_count' cannot be null`);
			}
		});

		it('likeCount should be 0 as default', async function () {
			const user = UserFactory.build();

			await connection.manager.save(user);

			assert.equal(user.likedCount, 0);

			const result: User = await userRepository.findOne({
				id: user.id,
			});

			assert.equal(result.likedCount, 0);
		});

		it('isAnonymous should not null', async function () {
			try {
				const name = 'Me and Bears';
				const description = 'description';
				const email = 'email';

				const user = new User();
				user.name = name;
				user.description = description;
				user.email = email;
				user.isAnonymous = null;

				await connection.manager.save(user);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'is_anonymous' cannot be null`);
			}
		});

		it('isAnonymous should be false as default', async function () {
			const user = UserFactory.build();

			await connection.manager.save(user);

			assert.equal(user.isAnonymous, false);
		});
	});

	describe('relation', () => {
		let user;
		let anotherUser;

		async function getNewUser(): Promise<User> {
			user = UserFactory.build();

			return await connection.manager.save(user);
		}

		it('should relate with role entity', async function () {
			user = await getNewUser();

			const adminRole = new RoleEntity();
			adminRole.name = RoleEnum.admin;
			await connection.manager.save(adminRole);

			assert.isNotNull(adminRole.id);

			const userRole = new RoleEntity();
			userRole.name = RoleEnum.user;
			await connection.manager.save(userRole);

			assert.isNotNull(userRole.id);

			user.roles = [adminRole, userRole];
			await connection.manager.save(user);

			assert.deepEqual(user.roles, [adminRole, userRole]);
		});

		it('should relate with notice entity', async function () {
			user = await getNewUser();

			const notice1 = new NoticeEntity();
			notice1.content = 'content';
			notice1.user = user;
			await connection.manager.save(notice1);
			assert.isNotNull(notice1.id);

			user.notices = [notice1];
			await connection.manager.save(user);

			const result = await userRepository
				.createQueryBuilder('users')
				.leftJoinAndSelect('users.notices', 'notices')
				.where({ id: user.id })
				.getOne();

			assert.deepStrictEqual(result.notices[0].id, notice1.id);
		});

		it('should relate with user setting entity', async function () {
			user = await getNewUser();

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
			user = await getNewUser();

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
			user = await getNewUser();

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
			user = await getNewUser();

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
			user = await getNewUser();

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
			user = await getNewUser();

			const oauth = new UserOauthEntity();
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
			user = await getNewUser();

			const user1 = await getNewUser();
			const user2 = await getNewUser();

			const like = new UserLikeEntity();
			like.toUserId = user1.id;
			like.fromUserId = user2.id;

			await connection.manager.save(like);

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
			user = await getNewUser();

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
			user = await getNewUser();

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
