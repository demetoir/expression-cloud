import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { ImageEntity } from './image.entity';

describe('image entity', () => {
	let connection;
	let imageRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		imageRepository = connection.getRepository(ImageEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(imageRepository);
	});

	it('should create new Entity', async function () {
		const image = new ImageEntity();
		image.url = 'url';
		image.extension = 'eeee';
		image.fileName = 'file';

		await connection.manager.save(image);

		const newImage = await imageRepository.findOne({ id: image.id });

		assert.equal(newImage.id, image.id);
	});

	describe('column type check', () => {
		it('should not null on url', async () => {
			try {
				const url = null;
				const extension = 'extension';
				const fileName = 'fileName';

				const notice = new ImageEntity();
				notice.url = url;
				notice.extension = extension;
				notice.fileName = fileName;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: images.url',
				);
			}
		});

		it('should not null on extension', async () => {
			try {
				const url = 'dfd';
				const extension = null;
				const fileName = 'fileName';

				const notice = new ImageEntity();
				notice.url = url;
				notice.extension = extension;
				notice.fileName = fileName;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: images.extension',
				);
			}
		});

		it('should not null on fileName', async () => {
			try {
				const url = 'dfd';
				const extension = 'extension';
				const fileName = null;

				const notice = new ImageEntity();
				notice.url = url;
				notice.extension = extension;
				notice.fileName = fileName;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: images.file_name',
				);
			}
		});
	});
});
