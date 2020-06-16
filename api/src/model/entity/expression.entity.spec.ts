import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { ExpressionEntity } from './expression.entity';
import { ProjectEntity } from './project.entity';
import { ColumnEntity } from './column.entity';

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

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(expressionRepository);
		assert.isNotNull(projectRepository);
	});

	it('should create new expression', async function () {
		const expression = new ExpressionEntity();
		expression.name = 'content';
		expression.description = 'expression';
		expression.type = 1;
		await connection.manager.save(expression);

		const newExpression = expressionRepository.findOne({
			id: expression.id,
		});

		assert.isNotNull(newExpression);
	});

	describe('column check', () => {
		it('should not null on description', async function () {
			try {
				const description = null;
				const name = 'name';
				const type = 1;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.content',
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
				const description = null;
				const name = 'name';
				const type = null;
				const expression = new ExpressionEntity();
				expression.description = description;
				expression.name = name;
				expression.type = type;

				await connection.manager.save(expression);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: expressions.type',
				);
			}
		});
	});

	describe('relation', () => {
		let expression;

		it('should prepare notice', async () => {
			expression = new ExpressionEntity();
			expression.type = 1;
			expression.name = 'name';
			expression.description = 'description';

			await connection.manager.save(expression);
		});

		it('should relate with column entity', async () => {
			const column = new ColumnEntity();
			column.name = 'user';
			column.index = 1;
			await connection.manager.save(column);

			column.expression = expression;
			await connection.manager.save(column);

			expression.columns = [column];
			await connection.manager.save(expression);

			const resultExpression = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['columns'],
			});

			assert.equal(resultExpression.columns[0].id, column.id);
		});

		it('should relate with project entity', async () => {
			const project = new ProjectEntity();
			project.name = 'user';
			project.description = 'desript';
			await connection.manager.save(project);

			project.expressions = [expression];
			await connection.manager.save(project);

			expression.project = project;
			await connection.manager.save(expression);

			const resultExpression = await expressionRepository.findOne({
				where: { id: expression.id },
				relations: ['project'],
			});

			assert.equal(resultExpression.project.id, project.id);
		});
	});
});
