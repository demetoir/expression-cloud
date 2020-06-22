import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { ScalarEntity } from './scalar.entity';
import { VectorEntity } from './vector.entity';

describe('value entity', () => {
	let valueRepository;
	let connection;
	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		valueRepository = await connection.getRepository(ScalarEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(valueRepository);
	});

	it('should create new entity', async function () {
		const value = new ScalarEntity();
		value.index = 0;
		value.value = 1;
		await connection.manager.save(value);

		const newValue = await valueRepository.findOne({ id: value.id });

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
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: values.index',
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
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: values.value',
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
