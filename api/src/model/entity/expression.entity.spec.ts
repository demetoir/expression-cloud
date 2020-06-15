import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { NoticeEntity } from './notice.entity';
import { ExpressionEntity } from './expression.entity';
import { ProjectEntity } from './project.entity';

describe('expression entity', () => {
	let expressionRepository;
	let connection;
	let projectRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		expressionRepository = connection.getRepository(ExpressionEntity);
		projectRepository = connection.getRepository(ProjectEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function() {
		assert.isNotNull(expressionRepository);
		assert.isNotNull(projectRepository);
	});

	it('should create new expression', async function() {
		const expression = new ExpressionEntity();
		expression.name = 'content';
		expression.description = 'expression';
		expression.type = 1;
		await connection.manager.save(expression);

		const newExpression = expressionRepository.findOne({ id: expression.id });

		assert.isNotNull(newExpression);
	});

	describe('column check', () => {
		it('should not null on content', async function() {
			try {
				const content = null;
				const notice = new NoticeEntity();
				notice.content = content;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: notice.content',
				);
			}
		});

		it('should not null on isRead', async function() {
			try {
				const content = 'content';
				const isRead = null;

				const notice = new NoticeEntity();
				notice.content = content;
				notice.isRead = isRead;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: notice.is_read',
				);
			}
		});

		it('should isRead auto false', async function() {
			const content = 'content';
			const isRead = undefined;

			const notice = new NoticeEntity();
			notice.content = content;
			notice.isRead = isRead;

			await connection.manager.save(notice);

			const resultNotice = await projectRepository.findOne({
				id: notice.id,
			});

			assert.equal(resultNotice.isRead, false);
		});
	});

	describe('relation', () => {
		let notice;

		it('should prepare notice', async () => {
			notice = new NoticeEntity();
			notice.content = 'content';

			await connection.manager.save(notice);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.notices = [notice];
			await connection.manager.save(user);

			notice.user = user;
			await connection.manager.save(notice);

			const resultUserSetting = await projectRepository.findOne({
				where: { id: notice.id },
				relations: ['user'],
			});

			assert.equal(resultUserSetting.user.id, user.id);
		});
	});
});
