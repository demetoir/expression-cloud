import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
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
		image.path = 'path';
		image.type = 1;

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
				const path = 'path';
				const type = 0;

				const image = new ImageEntity();
				image.url = url;
				image.extension = extension;
				image.fileName = fileName;
				image.path = path;
				image.type = type;

				await connection.manager.save(image);

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
				const path = 'path';
				const type = 0;

				const image = new ImageEntity();
				image.url = url;
				image.extension = extension;
				image.fileName = fileName;

				image.path = path;
				image.type = type;

				await connection.manager.save(image);

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
				const path = 'path';
				const type = 0;

				const image = new ImageEntity();
				image.url = url;
				image.extension = extension;
				image.fileName = fileName;
				image.path = path;
				image.type = type;

				await connection.manager.save(image);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: images.file_name',
				);
			}
		});

		it('should not null on path', async () => {
			try {
				const url = 'dfd';
				const extension = 'extension';
				const fileName = 'filename';
				const path = null;
				const type = 0;

				const image = new ImageEntity();
				image.url = url;
				image.extension = extension;
				image.fileName = fileName;
				image.path = path;
				image.type = type;

				await connection.manager.save(image);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: images.path',
				);
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

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: images.type',
				);
			}
		});
	});
});
