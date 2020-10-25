import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserFactory } from './user.factory';
import { Connection } from 'typeorm';
import { getConnectionForTest } from 'test/util/typeorm';

describe('user factory', () => {
	let userRepository: Repository<UserEntity>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest();
		userRepository = connection.getRepository(UserEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		expect(userRepository).toBeDefined();
	});

	it('should build random user', async function () {
		const user = UserFactory.build();

		await connection.manager.save(user);

		const stored = await userRepository.findOne({ id: user.id });

		expect(stored).toEqual(user);
	});
});
