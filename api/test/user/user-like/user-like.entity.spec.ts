import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { UserLikeEntity } from '../../../src/user/user-like/user-like.entity';
import { ormConfig } from '../../../src/common/model/configLoader';
import { UserFactory } from '../user/user.factory';
import { expectShouldNotCallThis } from '../../lib/helper/jestHelper';

describe('user like entity', () => {
	let connection;
	let repository;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

		repository = connection.getRepository(UserLikeEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(repository);
	});

	it('should create new project', async function () {
		const user1 = UserFactory.build();
		await connection.manager.save(user1);

		const user2 = UserFactory.build();
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

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"ER_BAD_NULL_ERROR: Column 'from_user_id' cannot be null",
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

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"ER_BAD_NULL_ERROR: Column 'to_user_id' cannot be null",
				);
			}
		});
	});
});
