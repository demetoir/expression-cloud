import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { VectorEntity } from './vector.entity';
import { ExpressionEntity } from './expression.entity';
import { ValueEntity } from './value.entity';

describe('column entity', () => {
	let vectorRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		vectorRepository = connection.getRepository(VectorEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(vectorRepository);
	});

	it('should create new Column', async function () {
		const column = new VectorEntity();
		column.name = 'column';
		column.index = 1;
		await connection.manager.save(column);

		const newExpression = await vectorRepository.findOne({
			id: column.id,
		});

		assert.isNotNull(newExpression.id);
	});

	describe('column type check', () => {
		it('should not null on name', async function () {
			try {
				const name = null;
				const index = 1;
				const column = new VectorEntity();
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
				const column = new VectorEntity();
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
		let vector;

		it('should prepare comment', async () => {
			vector = new VectorEntity();
			vector.name = 'description';
			vector.index = 1;

			await connection.manager.save(vector);
		});

		it('should relate with expression entity', async () => {
			const expression = new ExpressionEntity();
			expression.name = 'user';
			expression.description = 'description';
			expression.type = 1;
			await connection.manager.save(expression);

			expression.vectors = [vector];
			await connection.manager.save(expression);

			vector.expression = [expression];
			await connection.manager.save(vector);

			const result = await vectorRepository.findOne({
				where: { id: vector.id },
				relations: ['expression'],
			});

			assert.equal(result.expression.id, expression.id);
		});

		it('should relate with value entity', async () => {
			const value = new ValueEntity();
			value.index = 0;
			value.value = 0;

			await connection.manager.save(value);

			value.column = vector;
			await connection.manager.save(value);

			vector.values = [value];
			await connection.manager.save(vector);

			const result = await vectorRepository.findOne({
				where: { id: vector.id },
				relations: ['values'],
			});

			assert.equal(result.values[0].id, value.id);
		});
	});
});
