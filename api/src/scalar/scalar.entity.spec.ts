import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { ScalarEntity } from './scalar.entity';
import { VectorEntity } from '../vector/vector.entity';
import { ormConfig } from '../common/model/configLoader';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import { QueryFailedError } from 'typeorm/index';

describe('value entity', () => {
	let valueRepository;
	let connection;
	beforeAll(async () => {
		connection = await createConnection(ormConfig);

		valueRepository = await connection.getRepository(ScalarEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(valueRepository);
	});

	it('should create new entity', async function () {
		const scalar = new ScalarEntity();
		scalar.index = 0;
		scalar.value = 1;
		await connection.manager.save(scalar);

		const newValue = await valueRepository.findOne({ id: scalar.id });

		assert.isNotNull(newValue);
	});

	describe('column type check', () => {
		it('should not null on index', async function () {
			try {
				const index = null;
				const value = 0;

				const valueEntity = new ScalarEntity();
				valueEntity.index = index;
				valueEntity.value = value;
				await connection.manager.save(valueEntity);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'index' cannot be null`,
				);
			}
		});

		it('should not null on value column', async function () {
			try {
				const index = 0;
				const value = null;

				const valueEntity = new ScalarEntity();
				valueEntity.index = index;
				valueEntity.value = value;
				await connection.manager.save(valueEntity);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'value' cannot be null`,
				);
			}
		});

		it('should be value type on double type', async function () {
			const index = 0;
			const value = 4.12345678901234567890123456789;

			const valueEntity = new ScalarEntity();
			valueEntity.index = index;
			valueEntity.value = value;
			await connection.manager.save(valueEntity);

			assert.equal(valueEntity.value, value);
		});
	});

	describe('relation', () => {
		let scalar;

		it('should prepare entity', async () => {
			scalar = new ScalarEntity();
			scalar.value = 0;
			scalar.index = 0;

			await connection.manager.save(scalar);

			const result = await valueRepository.findOne({
				where: { id: scalar.id },
				relations: ['vector'],
			});

			assert.equal(result.value, scalar.value);
			assert.equal(result.index, scalar.index);
		});

		it('should relate with vector entity', async () => {
			const vector = new VectorEntity();
			vector.index = 0;
			vector.name = 'name';
			await connection.manager.save(vector);

			vector.scalars = [scalar];
			await connection.manager.save(vector);

			scalar.vector = vector;
			await connection.manager.save(scalar);

			const result = await valueRepository.findOne({
				where: { id: scalar.id },
				relations: ['vector'],
			});

			assert.equal(result.vector.id, vector.id);
		});
	});
});
