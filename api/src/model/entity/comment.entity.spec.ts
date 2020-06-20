import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

describe('expression comment', () => {
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
		const expression = new CommentEntity();
		expression.content = 'content';
		await connection.manager.save(expression);

		const newExpression = await commentRepository.findOne({
			id: expression.id,
		});

		assert.equal(newExpression.id, expression.id);
	});

	describe('column type check', () => {
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

			comment.columns = [user];
			await connection.manager.save(comment);

			const resultExpression = await commentRepository.findOne({
				where: { id: comment.id },
				relations: ['user'],
			});

			assert.equal(resultExpression.user.id, user.id);
		});
	});
});
