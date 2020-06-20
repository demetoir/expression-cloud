import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { ColumnEntity } from './column.entity';
import { ExpressionEntity } from './expression.entity';

describe('column entity', () => {
	let columnRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		columnRepository = connection.getRepository(ColumnEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(columnRepository);
	});

	it('should create new Column', async function () {
		const column = new ColumnEntity();
		column.name = 'column';
		column.index = 1;
		await connection.manager.save(column);

		const newExpression = columnRepository.findOne({
			id: column.id,
		});

		assert.isNotNull(newExpression);
	});

	describe('column type check', () => {
		it('should not null on name', async function () {
			try {
				const name = null;
				const index = 1;
				const column = new ColumnEntity();
				column.name = name;
				column.index = index;

				await connection.manager.save(column);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: columns.name',
				);
			}
		});

		it('should not null on index', async function () {
			try {
				const name = 'name';
				const index = null;
				const column = new ColumnEntity();
				column.name = name;
				column.index = index;

				await connection.manager.save(column);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: columns.index',
				);
			}
		});
	});

	describe('relation', () => {
		let column;

		it('should prepare comment', async () => {
			column = new ColumnEntity();
			column.name = 'description';
			column.index = 1;

			await connection.manager.save(column);
		});

		it('should relate with expression entity', async () => {
			const expression = new ExpressionEntity();
			expression.name = 'user';
			expression.description = 'description';
			expression.type = 1;
			await connection.manager.save(expression);

			expression.columns = [column];
			await connection.manager.save(expression);

			column.expression = [expression];
			await connection.manager.save(column);

			const result = await columnRepository.findOne({
				where: { id: column.id },
				relations: ['expression'],
			});

			assert.equal(result.expression.id, expression.id);
		});
	});
});
