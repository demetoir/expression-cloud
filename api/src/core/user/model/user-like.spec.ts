import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { Connection, Repository } from 'typeorm';
import * as _ from 'lodash';
import { MysqlErrorCodes } from 'mysql-error-codes';
import { getConnectionForTest } from 'test/database/test-typeorm';
import { UserFactory } from './user.factory';
import { User, UserLike } from '../../index';

const database = 'user_like_entity';
describe('user like entity', () => {
	let connection: Connection;
	let repository: Repository<UserLike>;

	let fromUser: User;
	let toUser: User;
	let notExistUser: User;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		repository = connection.getRepository(UserLike);
	});

	afterAll(async () => {
		await connection.close();
	});

	beforeEach(async () => {
		// prepare fixtures
		fromUser = await connection.manager.save(UserFactory.build());
		toUser = await connection.manager.save(UserFactory.build());

		const user = await connection.manager.save(UserFactory.build());
		notExistUser = _.cloneDeep(user);
		await connection.manager.remove(user);
	});

	it('should able to get repository from connection manager', () => {
		expect(connection).toBeDefined();
		expect(repository).toBeDefined();
	});

	it('should prepare fixtures', () => {
		expect(fromUser).toBeDefined();
		expect(toUser).toBeDefined();
		expect(notExistUser).toBeDefined();
	});

	describe('when create entity', () => {
		it('should create new project', async () => {
			const like = new UserLike();
			like.fromUserId = fromUser.id;
			like.toUserId = toUser.id;

			await connection.manager.save(like);

			const stored = await repository.findOne({
				fromUserId: like.fromUserId,
				toUserId: like.toUserId,
			});

			expect(stored).toEqual(like);
		});

		it('raise error, if not exist fromUserId', async () => {
			try {
				const like = new UserLike();
				like.fromUserId = notExistUser.id;
				like.toUserId = toUser.id;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const { errno } = e;

				expect(errno).toBe(MysqlErrorCodes.ER_NO_REFERENCED_ROW_2);
			}
		});

		it('raise error, if fromUserId is undefined', async () => {
			try {
				const like = new UserLike();
				like.fromUserId = undefined;
				like.toUserId = toUser.id;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const { errno } = e;
				expect(errno).toBe(MysqlErrorCodes.ER_NO_DEFAULT_FOR_FIELD);
			}
		});

		it('raise error, if not exist toUserId', async () => {
			try {
				const like = new UserLike();
				like.fromUserId = fromUser.id;
				like.toUserId = 0;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const { errno } = e;

				expect(errno).toBe(MysqlErrorCodes.ER_NO_REFERENCED_ROW_2);
			}
		});

		it('raise error, if toUserId is undefined', async () => {
			try {
				const like = new UserLike();
				like.fromUserId = fromUser.id;
				like.toUserId = undefined;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const { errno } = e;
				expect(errno).toBe(MysqlErrorCodes.ER_NO_DEFAULT_FOR_FIELD);
			}
		});

		it('raise error, if not exist fromUserId and toUserId', async () => {
			try {
				const like = new UserLike();
				like.fromUserId = 0;
				like.toUserId = 0;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const { errno } = e;

				expect(errno).toBe(MysqlErrorCodes.ER_NO_REFERENCED_ROW_2);
			}
		});

		it('raise error, if toUserId is undefined', async () => {
			try {
				const like = new UserLike();
				like.fromUserId = undefined;
				like.toUserId = undefined;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const { errno } = e;
				expect(errno).toBe(MysqlErrorCodes.ER_NO_DEFAULT_FOR_FIELD);
			}
		});
	});

	describe('when remove entity', () => {
		it('should soft removed', async () => {
			const like = new UserLike();
			like.fromUserId = fromUser.id;
			like.toUserId = toUser.id;
			await repository.save(like);

			// when removed
			await repository.softRemove(like);

			let stored;

			// should not find one
			stored = await repository.findOne({
				fromUserId: fromUser.id,
				toUserId: toUser.id,
			});
			expect(stored).not.toBeDefined();

			// should find one withDeleted
			stored = await repository.findOne(
				{ fromUserId: fromUser.id, toUserId: toUser.id },
				{ withDeleted: true },
			);
			expect(stored).toBeDefined();
		});
	});

	describe('column type check', () => {
		it('should not null on fromUserId', async () => {
			try {
				const fromUserId = null;
				const toUserId = 3;

				const like = new UserLike();
				like.fromUserId = fromUserId;
				like.toUserId = toUserId;
				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'fromUserId' cannot be null");
			}
		});

		it('should not null on toUserId', async () => {
			try {
				const fromUserId = 3;
				const toUserId = null;

				const like = new UserLike();
				like.fromUserId = fromUserId;
				like.toUserId = toUserId;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'toUserId' cannot be null");
			}
		});
	});
});
