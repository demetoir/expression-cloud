import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../../ormconfig.js';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

describe('comment entity', () => {
	let commentRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		commentRepository = connection.getRepository(CommentEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(commentRepository);
	});

	it('should create new expression', async function () {
		const comment = new CommentEntity();
		comment.content = 'content';
		await connection.manager.save(comment);

		const newExpression = await commentRepository.findOne({
			id: comment.id,
		});

		assert.equal(newExpression.id, comment.id);
	});

	describe('column type check', () => {
		it('should generate id ', async function () {
			const content = 'content';
			const comment = new CommentEntity();
			comment.content = content;

			await connection.manager.save(comment);

			assert(comment.id > 0);
		});

		it('should not null on content column', async function () {
			try {
				const content = null;
				const expression = new CommentEntity();
				expression.content = content;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: comments.content',
				);
			}
		});
	});

	describe('relation', () => {
		let comment;

		it('should prepare comment', async () => {
			comment = new CommentEntity();
			comment.content = 'description';

			await connection.manager.save(comment);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.email = 'email';
			user.description = 'description';
			await connection.manager.save(user);

			user.comments = [comment];
			await connection.manager.save(user);

			comment.user = user;
			await connection.manager.save(comment);

			const result = await commentRepository.findOne({
				where: { id: comment.id },
				relations: ['user'],
			});

			assert.isNotNull(result.user.id);
			assert.isNotNull(user.id);
			assert.equal(result.user.id, user.id);
		});
	});
});
