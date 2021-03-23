import { assert } from 'chai';
import { getConnectionForTest } from 'test/database/test-typeorm';
import { Connection, Repository } from 'typeorm';
import { ExpressionThumbnailImage } from './expression-thumbnail-image';

const database = 'expression_thumbnail_image_entity';
describe('ExpressionThumbnailImage entity', () => {
	let repository: Repository<ExpressionThumbnailImage>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		repository = connection.getRepository(ExpressionThumbnailImage);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(repository);
	});

	it('should create new entity', async () => {
		const entity = new ExpressionThumbnailImage();
		await connection.manager.save(entity);

		const result = await repository.findOne({
			id: entity.id,
		});

		assert.isNotNull(result);
	});

	// describe('relation', () => {
	// 	let expressionThumbnailImage;
	//
	// 	it('should prepare entity', async () => {
	// 		expressionThumbnailImage = new ExpressionThumbnailImageEntity();
	//
	// 		await connection.manager.save(expressionThumbnailImage);
	// 	});
	//
	// 	it('should relate with expression entity', async () => {
	// 		const expression = ExpressionFactory.build();
	// 		await connection.manager.save(expression);
	//
	// 		expression.thumbnailImage = expressionThumbnailImage;
	// 		await connection.manager.save(expression);
	//
	// 		expressionThumbnailImage.expression = expression;
	// 		await connection.manager.save(expression);
	//
	// 		const result = await repository.findOne({
	// 			where: { id: expressionThumbnailImage.id },
	// 			relations: ['expression'],
	// 		});
	//
	// 		assert.equal(result.expression.id, expression.id);
	// 	});
	//
	// 	it('should relate with image entity', async () => {
	// 		const image = ImageFactory.build();
	// 		image.expressionThumbnail = expressionThumbnailImage;
	// 		await connection.manager.save(image);
	//
	// 		expressionThumbnailImage.image = image;
	// 		await connection.manager.save(image);
	//
	// 		const result = await repository.findOne({
	// 			where: { id: expressionThumbnailImage.id },
	// 			relations: ['image'],
	// 		});
	//
	// 		assert.equal(result.image.id, image.id);
	// 	});
	// });
});
