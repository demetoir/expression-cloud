import { factory } from 'typeorm-seeding';
import { Connection, Repository } from 'typeorm';
import { getConnectionForTest } from 'test/database/test-typeorm';
import { User, UserDetail, UserLike, UserSetting } from '../../index';

const database = 'user_entity';
describe('user entity', () => {
	let repository: Repository<User>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		repository = connection.getRepository(User);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should prepared', async () => {
		expect(repository).toBeDefined();
		expect(connection).toBeDefined();
	});

	it('should create new user', async () => {
		const user = await factory(User)().create();

		expect(user).toBeDefined();
	});

	describe('relation to entity', () => {
		it('user has one user setting', async () => {
			const user = await factory(User)().create();

			const setting = await factory(UserSetting)().create({
				userId: user.id,
			});

			expect(setting).toBeDefined();
		});

		it('user has one user detail', async () => {
			const user = await factory(User)().create();

			const detail = await factory(UserDetail)().create({
				userId: user.id,
			});

			expect(detail).toBeDefined();
		});

		it('user has one user detail', async () => {
			const user = await factory(User)().create();

			const detail = await factory(UserDetail)().create({
				userId: user.id,
			});

			expect(detail).toBeDefined();
		});

		it('user has many userLike by toUserId', async () => {
			const user = await factory(User)().create();
			const otherUser = await factory(User)().create();

			const userLike = await factory(UserLike)().create({
				fromUserId: user.id,
				toUserId: otherUser.id,
			});

			expect(userLike).toBeDefined();
		});

		it('user belong to userLIke by fromUserId', async () => {
			const user = await factory(User)().create();
			const otherUser = await factory(User)().create();

			const userLike = await factory(UserLike)().create({
				fromUserId: user.id,
				toUserId: otherUser.id,
			});

			expect(userLike).toBeDefined();
		});
	});
});
