import { assert } from 'chai';
import { ImageEntity } from './image.entity';
import { ExpressionThumbnailImageEntity } from '../expression/expression-thumbnail-image/expression-thumbnail-image.entity';
import { UserProfileImageEntity } from '../user/user-profile-image/user-profile-image.entity';
import { ImageFactory } from './Image.factory';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { Connection, Repository } from 'typeorm';
import { getConnection } from 'test/resource/typeorm';

describe('image entity', () => {
	let connection: Connection;
	let repository: Repository<ImageEntity>;

	beforeAll(async () => {
		connection = await getConnection();

		repository = connection.getRepository(ImageEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(repository);
	});

	it('should create new Entity', async function () {
		const image = ImageFactory.build();

		await connection.manager.save(image);

		const newImage = await repository.findOne({ id: image.id });

		assert.equal(newImage.id, image.id);
	});

	describe('column type check', () => {
		it('should not null on url', async () => {
			try {
				const image = ImageFactory.build();
				image.url = null;

				await connection.manager.save(image);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'url' cannot be null");
			}
		});

		it('should not null on extension', async () => {
			try {
				const image = ImageFactory.build();
				image.extension = null;

				await connection.manager.save(image);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'extension' cannot be null");
			}
		});

		it('should not null on fileName', async () => {
			try {
				const image = ImageFactory.build();
				image.fileName = null;

				await connection.manager.save(image);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'file_name' cannot be null");
			}
		});

		it('should not null on path', async () => {
			try {
				const image = ImageFactory.build();
				image.path = null;

				await connection.manager.save(image);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'path' cannot be null");
			}
		});

		it('should not null on type', async () => {
			try {
				const url = 'dfd';
				const extension = 'extension';
				const fileName = 'filename';
				const path = 'path';
				const type = null;

				const image = new ImageEntity();
				image.url = url;
				image.extension = extension;
				image.fileName = fileName;
				image.path = path;
				image.type = type;

				await connection.manager.save(image);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'type' cannot be null");
			}
		});
	});

	describe('relation', () => {
		let image: ImageEntity;

		it('should prepare projectSetting', async () => {
			image = ImageFactory.build();

			await connection.manager.save(image);
		});

		it('should relate with expression thumbnail image entity', async () => {
			const thumbnailImage = new ExpressionThumbnailImageEntity();
			await connection.manager.save(thumbnailImage);

			image.expressionThumbnail = thumbnailImage;
			await connection.manager.save(thumbnailImage);

			thumbnailImage.image = image;
			await connection.manager.save(thumbnailImage);

			const result = await repository.findOne({
				where: { id: image.id },
				relations: ['expressionThumbnail'],
			});

			assert.equal(
				(await result.expressionThumbnail).id,
				thumbnailImage.id,
			);
		});

		it('should relate with UserProfile thumbnail image entity', async () => {
			const userProfileImageEntity = new UserProfileImageEntity();
			await connection.manager.save(userProfileImageEntity);

			userProfileImageEntity.image = image;
			await connection.manager.save(userProfileImageEntity);

			image.userProfile = userProfileImageEntity;
			await connection.manager.save(userProfileImageEntity);

			const result = await repository.findOne({
				where: { id: image.id },
				relations: ['userProfile'],
			});

			assert.equal(result.userProfile.id, userProfileImageEntity.id);
		});
	});
});
