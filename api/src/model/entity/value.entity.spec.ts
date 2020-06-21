import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { ValueEntity } from './value.entity';
import { ColumnEntity } from './column.entity';

describe('value entity', () => {
	let valueRepository;
	let connection;
	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		valueRepository = await connection.getRepository(ValueEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(valueRepository);
	});

	it('should create new entity', async function () {
		const value = new ValueEntity();
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

				const valueEntity = new ValueEntity();
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

				const valueEntity = new ValueEntity();
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

			const valueEntity = new ValueEntity();
			valueEntity.index = index;
			valueEntity.value = value;
			await connection.manager.save(valueEntity);

			assert.equal(valueEntity.value, value);
		});
	});

	describe('relation', () => {
		let value;

		it('should prepare value', async () => {
			value = new ValueEntity();
			value.value = 0;
			value.index = 0;

			await connection.manager.save(value);

			const result = await valueRepository.findOne({
				where: { id: value.id },
				relations: ['column'],
			});
			console.log(result);
		});

		it('should relate with column entity', async () => {
			const column = new ColumnEntity();
			column.index = 0;
			column.name = 'name';
			await connection.manager.save(column);

			column.values = [value];
			await connection.manager.save(column);

			value.column = column;
			await connection.manager.save(value);

			const result = await valueRepository.findOne({
				where: { id: value.id },
				relations: ['column'],
			});

			assert.equal(result.column.id, column.id);
		});
	});
});
