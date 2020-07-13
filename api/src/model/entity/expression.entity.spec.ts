import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { ExpressionEntity } from './expression.entity';
import { VectorEntity } from './vector.entity';
import { ExpressionSettingEntity } from './expressionSetting.entity';
import { ImageEntity } from './image.entity';
import { ExpressionThumbnailImageEntity } from './expressionThumbnailImage.entity';
import { UserEntity } from './user.entity';

describe('expression entity', () => {
	let expressionRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		expressionRepository = connection.getRepository(ExpressionEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(expressionRepository);
	});

	it('should create new expression', async function () {
		const expression = new ExpressionEntity();
		expression.name = 'content';
		expression.description = 'expression';
		expression.type = 1;
		expression.content = 'content';
		await connection.manager.save(expression);

		const newExpression = await expressionRepository.findOne({
			id: expression.id,
		});

		assert.isNotNull(newExpression);
	});

	describe('column type check', () => {
		it('should not null on description', async function () {
			try {
				const description = null;
				const name = 'name';
				const type = 1;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = 'content';

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.description',
				);
			}
		});

		it('should not null on name', async function () {
			try {
				const description = 'description';
				const name = null;

				const type = 1;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = 'content';

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.name',
				);
			}
		});

		it('should not null on type', async function () {
			try {
				const description = 'expression';
				const name = 'name';
				const type = null;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = 'content';

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.type',
				);
			}
		});

		it('should not null on content', async function () {
			try {
				const description = '1';
				const name = 'name';
				const type = 1;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = null;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.content',
				);
			}
		});

		it('should not null on likeCount', async function () {
			try {
				const description = '1';
				const name = 'name';
				const type = 1;
				const likeCount = null;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = '123';
				expression.likeCount = likeCount;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.like_count',
				);
			}
		});

		it('should not null on isForked', async function () {
			try {
				const description = '1';
				const name = 'name';
				const type = 1;
				const isForked = null;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = '1234';
				expression.isForked = isForked;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.is_forked',
				);
			}
		});

		it('should not null on forkCount`', async function () {
			try {
				const description = '1';
				const name = 'name';
				const type = 1;
				const expression = new ExpressionEntity();
				const forkCount = null;
				expression.description = description;
				expression.name = name;
				expression.type = type;
				expression.content = '1234';
				expression.forkCount = forkCount;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.fork_count',
				);
			}
		});

		it('should be false on isForked as default', async function () {
			const description = '1';
			const name = 'name';
			const type = 1;
			const expression = new ExpressionEntity();
			expression.description = description;
			expression.name = name;
			expression.type = type;
			expression.content = '1234';

			await connection.manager.save(expression);
			assert.equal(expression.isForked, false);
		});

		it('should be 0 on forkCount as default', async function () {
			const description = '1';
			const name = 'name';
			const type = 1;
			const expression = new ExpressionEntity();
			expression.description = description;
			expression.name = name;
			expression.type = type;
			expression.content = '1234';

			await connection.manager.save(expression);
			assert.equal(expression.forkCount, 0);
		});

		it('should be 0 on likeCount as default', async function () {
			const description = '1';
			const name = 'name';
			const type = 1;
			const expression = new ExpressionEntity();
			expression.description = description;
			expression.name = name;
			expression.type = type;
			expression.content = '1234';

			await connection.manager.save(expression);
			assert.equal(expression.likeCount, 0);
		});
	});

	describe('relation', () => {
		let expression;

		async function getNewExpressionEntity(): Promise<ExpressionEntity> {
			const expression = new ExpressionEntity();
			expression.type = 1;
			expression.name = 'name';
			expression.description = 'description';
			expression.content = 'content';

			return await connection.manager.save(expression);
		}

		it('should prepare notice', async () => {
			expression = new ExpressionEntity();
			expression.type = 1;
			expression.name = 'name';
			expression.description = 'description';
			expression.content = 'content';

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
			const thumbnailImage = new ExpressionThumbnailImageEntity();

			thumbnailImage.expression = expression;
			await connection.manager.save(thumbnailImage);

			expression.thumbnailImage = thumbnailImage;
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['thumbnailImage'],
			});

			assert.equal(result.thumbnailImage.id, thumbnailImage.id);
		});

		it('should eager load image entity in thumbnailImage', async () => {
			const expression = await getNewExpressionEntity();

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
			await connection.manager.save(image);

			const thumbnailImage = new ExpressionThumbnailImageEntity();

			thumbnailImage.expression = expression;
			thumbnailImage.image = image;
			await connection.manager.save(thumbnailImage);

			expression.thumbnailImage = thumbnailImage;
			await connection.manager.save(expression);

			const result = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['thumbnailImage'],
			});

			assert.equal(result.thumbnailImage.image.id, image.id);
		});

		async function getNewUser(): Promise<UserEntity> {
			const user = new UserEntity();
			user.name = 'Me and Bears';
			user.description = 'I am near polar bears';
			user.email = 'email';
			return await connection.manager.save(user);
		}

		it('should relate with expression likes ', async () => {
			const user = await getNewUser();

			expression.likeFrom = [user];
			await connection.manager.save(expression);

			user.likeToExpressions = [expression];
			await connection.manager.save(user);

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
