import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { ormConfig } from '../common/model/configLoader';
import { UserFactory } from '../../test/user/user/user.factory';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import { QueryFailedError } from 'typeorm/index';

describe('comment entity', () => {
	let commentRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
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

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					"ER_BAD_NULL_ERROR: Column 'content' cannot be null",
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
			const user = UserFactory.build();
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
