import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { UserLikeEntity } from './user-like.entity';
import { ormConfig } from '../../common/model/configLoader';
import { UserEntity } from '../user/user.entity';

describe('user like entity', () => {
	let connection;
	let repository;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		await connection.synchronize();

		repository = connection.getRepository(UserLikeEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(repository);
	});

	it('should create new project', async function () {
		const user1 = new UserEntity();
		user1.email = '1';
		user1.name = '1';
		user1.description = '1';

		await connection.manager.save(user1);

		const user2 = new UserEntity();
		user2.email = '2';
		user2.name = '1';
		user2.description = '1';

		await connection.manager.save(user2);

		const like = new UserLikeEntity();
		const fromUserId = user1.id;
		const toUserId = user2.id;
		like.fromUserId = fromUserId;
		like.toUserId = toUserId;

		await connection.manager.save(like);

		const stored = await repository.findOne({
			fromUserId: like.fromUserId,
			toUserId: like.toUserId,
		});

		expect(stored).toEqual(like);
	});

	describe('column type check', () => {
		it('should not null on type', async function () {
			try {
				const fromUserId = null;
				const toUserId = 3;

				const like = new UserLikeEntity();
				like.fromUserId = fromUserId;
				like.toUserId = toUserId;
				await connection.manager.save(like);

				assert(false, 'should throw this error');
			} catch (e) {
				expect(e.message).toBe(
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: user_likes.from_user_id',
				);
			}
		});

		it('should not null on authId', async function () {
			try {
				const fromUserId = 3;
				const toUserId = null;

				const like = new UserLikeEntity();
				like.fromUserId = fromUserId;
				like.toUserId = toUserId;

				await connection.manager.save(like);

				assert(false, 'should throw this error');
			} catch (e) {
				expect(e.message).toBe(
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: user_likes.to_user_id',
				);
			}
		});
	});
});
