import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../ormconfig.js';
import { ExpressionEntity } from './expression.entity';
import { ExpressionThumbnailImageEntity } from './expression-thumbnail-image.entity';
import { ImageEntity } from '../image/image.entity';
import { ormConfig } from '../common/model/configLoader';

describe('ExpressionThumbnailImage entity', () => {
	let repository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		await connection.synchronize();

		repository = connection.getRepository(ExpressionThumbnailImageEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(repository);
	});

	it('should create new entity', async function () {
		const entity = new ExpressionThumbnailImageEntity();
		await connection.manager.save(entity);

		const result = await repository.findOne({
			id: entity.id,
		});

		assert.isNotNull(result);
	});

	describe('relation', () => {
		let expressionThumbnailImage;

		it('should prepare entity', async () => {
			expressionThumbnailImage = new ExpressionThumbnailImageEntity();

			await connection.manager.save(expressionThumbnailImage);
		});

		it('should relate with expression entity', async () => {
			const expression = new ExpressionEntity();
			expression.type = 1;
			expression.content = 'content';
			expression.description = 'description';
			expression.name = 'tab';
			await connection.manager.save(expression);

			expression.thumbnailImage = expressionThumbnailImage;
			await connection.manager.save(expression);

			expressionThumbnailImage.expression = expression;
			await connection.manager.save(expression);

			const result = await repository.findOne({
				where: { id: expressionThumbnailImage.id },
				relations: ['expression'],
			});

			assert.equal(result.expression.id, expression.id);
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
			image.expressionThumbnail = expressionThumbnailImage;
			await connection.manager.save(image);

			expressionThumbnailImage.image = image;
			await connection.manager.save(image);

			const result = await repository.findOne({
				where: { id: expressionThumbnailImage.id },
				relations: ['image'],
			});

			assert.equal(result.image.id, image.id);
		});
	});
});
