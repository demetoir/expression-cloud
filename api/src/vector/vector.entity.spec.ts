import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { VectorEntity } from './vector.entity';
import { ScalarEntity } from '../scalar/scalar.entity';
import { ormConfig } from '../common/model/configLoader';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import { QueryFailedError } from 'typeorm/index';
import { VectorFactory } from './vector.factory';
import { ExpressionFactory } from '../expression/expression/expression.factory';

describe('column entity', () => {
	let vectorRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

		vectorRepository = connection.getRepository(VectorEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(vectorRepository);
	});

	it('should create new Column', async function () {
		const vector = VectorFactory.build();
		await connection.manager.save(vector);

		const stored = await vectorRepository.findOne({
			id: vector.id,
		});

		expect(stored).toEqual(vector);
	});

	describe('column type check', () => {
		it('should not null on name', async function () {
			try {
				const vector = VectorFactory.build();
				vector.name = null;

				await connection.manager.save(vector);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'name' cannot be null`);
			}
		});

		it('should not null on index', async function () {
			try {
				const vector = VectorFactory.build();
				vector.index = null;

				await connection.manager.save(vector);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'index' cannot be null`);
			}
		});
	});

	describe('relation', () => {
		let vector;

		it('should prepare comment', async () => {
			vector = VectorFactory.build();

			await connection.manager.save(vector);
		});

		it('should relate with expression entity', async () => {
			const expression = ExpressionFactory.build();
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
