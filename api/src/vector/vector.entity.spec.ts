import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../ormconfig.js';
import { VectorEntity } from './vector.entity';
import { ExpressionEntity } from '../expression/expression/expression.entity';
import { ScalarEntity } from '../scalar/scalar.entity';
import { ormConfig } from '../common/model/configLoader';

describe('column entity', () => {
	let vectorRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
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
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: vectors.name',
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
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: vectors.index',
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
			expression.content = '1';
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

		it('should relate with scalar entity', async () => {
			const scalar = new ScalarEntity();
			scalar.index = 0;
			scalar.value = 0;

			await connection.manager.save(scalar);

			scalar.vector = vector;
			await connection.manager.save(scalar);

			vector.scalars = [scalar];
			await connection.manager.save(vector);

			const result = await vectorRepository.findOne({
				where: { id: vector.id },
				relations: ['scalars'],
			});

			assert.equal(result.scalars[0].id, scalar.id);
		});
	});
});
