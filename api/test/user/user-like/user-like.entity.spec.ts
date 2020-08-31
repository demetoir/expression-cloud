import { createConnection } from 'typeorm';
import { UserLikeEntity } from '../../../src/user/user-like/user-like.entity';
import { ormConfig } from '../../../src/common/model/configLoader';
import { UserFactory } from '../user/user.factory';
import { expectShouldNotCallThis } from '../../lib/helper/jestHelper';
import { Connection, Repository } from 'typeorm/index';
import { UserEntity } from '../../../src/user/user/user.entity';
import * as _ from 'lodash';
import { MysqlErrorCodes } from 'mysql-error-codes';

describe('user like entity', () => {
	let connection: Connection;
	let repository: Repository<UserLikeEntity>;

	let fromUser: UserEntity;
	let toUser: UserEntity;
	let notExistUser: UserEntity;

	beforeAll(async () => {
		// prepare connection and repository
		connection = await createConnection(ormConfig);
		repository = connection.getRepository(UserLikeEntity);
	});

	beforeEach(async () => {
		// prepare fixtures
		fromUser = await connection.manager.save(UserFactory.build());
		toUser = await connection.manager.save(UserFactory.build());

		const user = await connection.manager.save(UserFactory.build());
		notExistUser = _.cloneDeep(user);
		await connection.manager.remove(user);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		expect(connection).toBeDefined();
		expect(repository).toBeDefined();
	});

	it('should prepare fixtures', function () {
		expect(fromUser).toBeDefined();
		expect(toUser).toBeDefined();
		expect(notExistUser).toBeDefined();
	});

	describe('when create entity', function () {
		it('should create new project', async function () {
			const like = new UserLikeEntity();
			like.fromUserId = fromUser.id;
			like.toUserId = toUser.id;

			await connection.manager.save(like);

			const stored = await repository.findOne({
				fromUserId: like.fromUserId,
				toUserId: like.toUserId,
			});

			expect(stored).toEqual(like);
		});

		it('raise error, if not exist fromUserId', async function () {
			try {
				const like = new UserLikeEntity();
				like.fromUserId = notExistUser.id;
				like.toUserId = toUser.id;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const errno = e['errno'];

				expect(errno).toBe(MysqlErrorCodes.ER_NO_REFERENCED_ROW_2);
			}
		});

		it('raise error, if fromUserId is undefined', async function () {
			try {
				const like = new UserLikeEntity();
				like.fromUserId = undefined;
				like.toUserId = toUser.id;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const errno = e['errno'];
				expect(errno).toBe(MysqlErrorCodes.ER_NO_DEFAULT_FOR_FIELD);
			}
		});

		it('raise error, if not exist toUserId', async function () {
			try {
				const like = new UserLikeEntity();
				like.fromUserId = fromUser.id;
				like.toUserId = notExistUser.id;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const errno = e['errno'];

				expect(errno).toBe(MysqlErrorCodes.ER_NO_REFERENCED_ROW_2);
			}
		});

		it('raise error, if toUserId is undefined', async function () {
			try {
				const like = new UserLikeEntity();
				like.fromUserId = fromUser.id;
				like.toUserId = undefined;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const errno = e['errno'];
				expect(errno).toBe(MysqlErrorCodes.ER_NO_DEFAULT_FOR_FIELD);
			}
		});

		it('raise error, if not exist fromUserId and toUserId', async function () {
			try {
				const like = new UserLikeEntity();
				like.fromUserId = notExistUser.id;
				like.toUserId = notExistUser.id;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const errno = e['errno'];

				expect(errno).toBe(MysqlErrorCodes.ER_NO_REFERENCED_ROW_2);
			}
		});

		it('raise error, if toUserId is undefined', async function () {
			try {
				const like = new UserLikeEntity();
				like.fromUserId = undefined;
				like.toUserId = undefined;

				await connection.manager.save(like);

				expectShouldNotCallThis();
			} catch (e) {
				const errno = e['errno'];
				expect(errno).toBe(MysqlErrorCodes.ER_NO_DEFAULT_FOR_FIELD);
			}
		});
	});

	describe('when remove entity', function () {
		it('should soft removed', async function () {
			const like = new UserLikeEntity();
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
		it('should not null on fromUserId', async function () {
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

		it('should not null on toUserId', async function () {
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
