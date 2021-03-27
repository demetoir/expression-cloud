import { factory } from 'typeorm-seeding';
import { assert } from 'chai';
import { Connection, QueryFailedError, Repository } from 'typeorm';
import { getConnectionForTest } from 'test/database/test-typeorm';
import { UserDetail } from '../model/user-detail';
import { User } from '../model/user';

const database = 'user_detail';
describe('user detail entity', () => {
	let repository: Repository<UserDetail>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		repository = connection.getRepository(UserDetail);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should prepared', async () => {
		expect(repository).toBeDefined();
		expect(connection).toBeDefined();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(repository);
	});

	it('should create new entity', async () => {
		const user = await factory(User)().create();

		const userDetail = await factory(UserDetail)().create({
			userId: user.id,
		});

		expect(userDetail).toBeDefined();
	});

	describe('check column constraint', () => {
		it('name should not be undefined', async () => {
			const user = await factory(User)().create();
			const userDetail = await factory(UserDetail)().make({
				userId: user.id,
				name: undefined,
			});

			try {
				await repository.save(userDetail);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e.message).toBe(
					`Field 'name' doesn't have a default value`,
				);
			}
		});

		it('email should default null, while it is undefined', async () => {
			const user = await factory(User)().create();

			const userDetail = await factory(UserDetail)().create({
				userId: user.id,
				email: undefined,
			});

			expect(userDetail.email).toBeNull();
		});

		it('forkedCount should not be null', async () => {
			const user = await factory(User)().create();
			const userDetail = await factory(UserDetail)().make({
				userId: user.id,
				forkedCount: null,
			});

			try {
				await repository.save(userDetail);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'forkedCount' cannot be null`);
			}
		});

		it('forkedCount should be 0 as default', async () => {
			const user = await factory(User)().create();

			const userDetail = await factory(UserDetail)().create({
				userId: user.id,
				forkedCount: undefined,
			});

			expect(userDetail.forkedCount).toBe(0);
		});

		it('likeCount should be not null', async () => {
			const user = await factory(User)().create();

			const userDetail = await factory(UserDetail)().make({
				userId: user.id,
				likedCount: null,
			});

			try {
				await repository.save(userDetail);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'likedCount' cannot be null`);
			}
		});

		it('likeCount should be 0 as default', async () => {
			const user = await factory(User)().create();

			const userDetail = await factory(UserDetail)().create({
				userId: user.id,
				likedCount: undefined,
			});

			expect(userDetail.likedCount).toBe(0);
		});

		it('isAnonymous should not null', async () => {
			const user = await factory(User)().create();

			const userDetail = await factory(UserDetail)().make({
				userId: user.id,
				isAnonymous: null,
			});

			try {
				await repository.save(userDetail);

				assert(false, 'should not call this');
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'isAnonymous' cannot be null`);
			}
		});

		it('isAnonymous should be false as default', async () => {
			const user = await factory(User)().create();

			const userDetail = await factory(UserDetail)().create({
				userId: user.id,
				isAnonymous: undefined,
			});

			expect(userDetail.isAnonymous).toBe(false);
		});
	});
});
