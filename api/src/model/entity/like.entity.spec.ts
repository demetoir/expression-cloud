import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { LikeEntity } from './like.entity';

describe('like entity', () => {
	let userRepository;
	let connection;
	let likeRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userRepository = connection.getRepository(UserEntity);
		likeRepository = connection.getRepository(LikeEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(userRepository);
		assert.isNotNull(likeRepository);
	});

	it('should create new project', async function () {
		const notice = new LikeEntity();
		await connection.manager.save(notice);

		const newContent = likeRepository.findOne({ id: notice.id });

		assert.isNotNull(newContent);
	});

	describe('relation', () => {
		let like;

		it('should prepare like', async () => {
			like = new LikeEntity();

			await connection.manager.save(like);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.likes = [like];
			await connection.manager.save(user);

			like.user = user;
			await connection.manager.save(like);

			const resultUserSetting = await likeRepository.findOne({
				where: { id: like.id },
				relations: ['user'],
			});

			assert.equal(resultUserSetting.user.id, user.id);
		});
	});
});
