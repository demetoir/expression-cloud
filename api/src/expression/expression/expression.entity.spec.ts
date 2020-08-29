import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { ExpressionEntity } from './expression.entity';
import { VectorEntity } from '../../vector/vector.entity';
import { ExpressionSettingEntity } from '../expression-setting/expression-setting.entity';
import { ImageEntity } from '../../image/image.entity';
import { ExpressionThumbnailImageEntity } from '../expression-thumbnail-image/expression-thumbnail-image.entity';
import { UserEntity } from '../../user/user/user.entity';
import { ormConfig } from '../../common/model/configLoader';
import { ExpressionFactory } from './expression.factory';
import { expectShouldNotCallThis } from '../../../test/lib/helper/jestHelper';
import { QueryFailedError } from 'typeorm/index';
import { UserFactory } from '../../../test/user/user/user.factory';

describe('expression entity', () => {
	let expressionRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

		expressionRepository = connection.getRepository(ExpressionEntity);
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(expressionRepository);
	});

	it('should create new expression', async function () {
		const expression = ExpressionFactory.build();

		await connection.manager.save(expression);

		const newExpression = await expressionRepository.findOne({
			id: expression.id,
		});

		assert.isNotNull(newExpression);
	});

	describe('column type check', () => {
		it('should not null on description', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.description = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'description' cannot be null`,
				);
			}
		});

		it('should not null on name', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.name = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'name' cannot be null`,
				);
			}
		});

		it('should not null on type', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.type = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'type' cannot be null`,
				);
			}
		});

		it('should not null on content', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.content = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'content' cannot be null`,
				);
			}
		});

		it('should not null on likeCount', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.likeCount = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'like_count' cannot be null`,
				);
			}
		});

		it('should not null on isForked', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.isForked = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'is_forked' cannot be null`,
				);
			}
		});

		it('should not null on forkCount', async function () {
			try {
				const expression = ExpressionFactory.build();
				expression.forkCount = null;

				await connection.manager.save(expression);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'fork_count' cannot be null`,
				);
			}
		});

		it('should be false on isForked as default', async function () {
			const expression = ExpressionFactory.build();

			await connection.manager.save(expression);
			assert.equal(expression.isForked, false);
		});

		it('should be 0 on forkCount as default', async function () {
			const expression = ExpressionFactory.build();

			await connection.manager.save(expression);
			assert.equal(expression.forkCount, 0);
		});

		it('should be 0 on likeCount as default', async function () {
			const expression = ExpressionFactory.build();

			await connection.manager.save(expression);
			assert.equal(expression.likeCount, 0);
		});
	});

	describe('relation', () => {
		let expression: ExpressionEntity;

		async function getNewExpressionEntity(): Promise<ExpressionEntity> {
			const expression = ExpressionFactory.build();

			return await connection.manager.save(expression);
		}

		it('should prepare notice', async () => {
			expression = ExpressionFactory.build();

			await connection.manager.save(expression);
		});

		it('should relate with column entity', async () => {
			const vector = new VectorEntity();
			vector.index = 0;
			vector.name = 'name';

			await connection.manager.save(vector);

			vector.expression = expression;
			await connection.manager.save(vector);

			expression.vectors = [vector];
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['vectors'],
			});

			assert.equal(result.vectors[0].id, vector.id);
		});

		it('should relate with expression setting entity', async () => {
			const setting = new ExpressionSettingEntity();
			await connection.manager.save(setting);

			setting.expression = expression;
			await connection.manager.save(setting);

			expression.setting = setting;
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['setting'],
			});

			assert.equal(result.setting.id, setting.id);
		});

		it('should relate with thumbnail image', async () => {
			let thumbnailImage = new ExpressionThumbnailImageEntity();
			thumbnailImage.expression = expression;
			thumbnailImage = await connection.manager.save(thumbnailImage);

			expression.thumbnailImage = Promise.resolve(thumbnailImage);
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
			});

			expect((await result.thumbnailImage).id).toBe(thumbnailImage.id);
		});

		it('should eager load image entity in thumbnailImage', async () => {
			const expression = await getNewExpressionEntity();

			const url = 'dfd';
			const extension = 'extension';
			const fileName = 'filename';
			const path = 'path';
			const type = 1;

			let image = new ImageEntity();
			image.url = url;
			image.extension = extension;
			image.fileName = fileName;
			image.path = path;
			image.type = type;
			image = await connection.manager.save(image);

			let thumbnailImage = new ExpressionThumbnailImageEntity();

			thumbnailImage.expression = expression;
			thumbnailImage.image = image;
			thumbnailImage = connection.manager.save(thumbnailImage);

			expression.thumbnailImage = Promise.resolve(thumbnailImage);
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
			});

			expect(result.thumbnailImage.id).toEqual(thumbnailImage.id);
		});

		async function getNewUser(): Promise<UserEntity> {
			const user = UserFactory.build();

			return await connection.manager.save(user);
		}

		it('should relate with expression likes ', async () => {
			const user = await getNewUser();

			user.likeToExpressions = [expression];
			// await connection.manager.save(user);

			expression.likeFrom = [user];
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['likeFrom'],
			});

			assert.equal(result.likeFrom[0].id, user.id);
		});

		it('should relate with origin expression ', async () => {
			const forked = await getNewExpressionEntity();

			forked.forkedFrom = expression;
			await connection.manager.save(forked);

			const result = await expressionRepository.findOne({
				where: { id: forked.id },
				relations: ['forkedFrom'],
			});

			assert.equal(result.forkedFrom.id, expression.id);
		});
	});
});
