import { createConnection, Repository } from 'typeorm';
import { UserEntity } from '../../../src/user/user/user.entity';
import { ormConfig } from '../../../src/common/model/configLoader';
import { UserFactory } from './user.factory';

describe('user factory', () => {
	let userRepository: Repository<UserEntity>;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		userRepository = connection.getRepository(UserEntity);
	});

	afterAll(async () => {
		connection.close();
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
