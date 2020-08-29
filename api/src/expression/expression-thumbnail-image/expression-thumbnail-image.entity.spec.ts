import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { ExpressionThumbnailImageEntity } from './expression-thumbnail-image.entity';
import { ormConfig } from '../../common/model/configLoader';
import { ExpressionFactory } from '../expression/expression.factory';
import { ImageFactory } from '../../image/Image.factory';

describe('ExpressionThumbnailImage entity', () => {
	let repository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
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
			const expression = ExpressionFactory.build();
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
			const image = ImageFactory.build();
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
