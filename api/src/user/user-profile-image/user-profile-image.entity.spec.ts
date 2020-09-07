import { assert } from 'chai';
import { UserProfileImageEntity } from './user-profile-image.entity';
import { UserEntity } from '../user/user.entity';
import { ImageEntity } from '../../image/image.entity';
import { UserFactory } from '../../../test/user/user/user.factory';
import { Connection, Repository } from 'typeorm/index';
import { getConnection } from '../../../test/resource/typeorm';

describe('userProfile entity', () => {
	let connection: Connection;
	let repository: Repository<UserProfileImageEntity>;

	beforeAll(async () => {
		connection = await getConnection();
		repository = connection.getRepository(UserProfileImageEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(repository);
	});

	it('should create new entity', async function () {
		const userProfileImage = new UserProfileImageEntity();
		await connection.manager.save(userProfileImage);

		const newUserSetting = await repository.findOne({
			id: userProfileImage.id,
		});

		assert.isNotNull(newUserSetting);
	});

	describe('relation', () => {
		let userProfileImage;

		async function getNewUser(): Promise<UserEntity> {
			const user = UserFactory.build();
			return await connection.manager.save(user);
		}

		it('should prepare entity', async () => {
			userProfileImage = new UserProfileImageEntity();

			await connection.manager.save(userProfileImage);
		});

		it('should relate with user entity', async () => {
			const user = await getNewUser();

			user.profileImage = userProfileImage;

			await connection.manager.save(user);

			userProfileImage.user = user;
			await connection.manager.save(userProfileImage);

			const result = await repository.findOne({
				where: { id: userProfileImage.id },
				relations: ['user'],
			});

			assert.equal(result.user.id, user.id);
		});

		it('should relate with image entity', async () => {
			const url = 'dfd';
			const extension = 'extension';
			const fileName = 'filename';
			const path = 'path';
			const type = 1;

			const image = new ImageEntity();
			image.url = url;
			image.extension = extension;
			image.fileName = fileName;
			image.path = path;
			image.type = type;
			image.userProfile = userProfileImage;
			await connection.manager.save(image);

			userProfileImage.image = image;
			await connection.manager.save(image);

			const result = await repository.findOne({
				where: { id: userProfileImage.id },
				relations: ['image'],
			});

			assert.equal(result.image.id, image.id);
		});
	});
});
