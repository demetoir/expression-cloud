import { assert } from 'chai';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { Connection, QueryFailedError, Repository } from 'typeorm';
import { getConnectionForTest } from 'test/util/typeorm';
import { Scalar } from './scalar';

const database = 'scalar_entity';
describe('scalar entity', () => {
	let repository: Repository<Scalar>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);

		repository = await connection.getRepository(Scalar);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(repository);
	});

	it('should create new entity', async () => {
		const scalar = new Scalar();
		scalar.index = 0;
		scalar.value = 1;
		await connection.manager.save(scalar);

		const newValue = await repository.findOne({ id: scalar.id });

		assert.isNotNull(newValue);
	});

	describe('column type check', () => {
		it('should not null on index', async () => {
			try {
				const index = null;
				const value = 0;

				const valueEntity = new Scalar();
				valueEntity.index = index;
				valueEntity.value = value;
				await connection.manager.save(valueEntity);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'index' cannot be null`);
			}
		});

		it('should not null on value column', async () => {
			try {
				const index = 0;
				const value = null;

				const valueEntity = new Scalar();
				valueEntity.index = index;
				valueEntity.value = value;
				await connection.manager.save(valueEntity);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe(`Column 'value' cannot be null`);
			}
		});

		it('should be value type on double type', async () => {
			const index = 0;
			const value = 4.12345678901234567890123456789;

			const valueEntity = new Scalar();
			valueEntity.index = index;
			valueEntity.value = value;
			await connection.manager.save(valueEntity);

			assert.equal(valueEntity.value, value);
		});
	});

	// describe('relation', () => {
	// 	let scalar;
	//
	// 	it('should prepare entity', async () => {
	// 		scalar = new ScalarEntity();
	// 		scalar.value = 0;
	// 		scalar.index = 0;
	//
	// 		await connection.manager.save(scalar);
	//
	// 		const result = await repository.findOne({
	// 			where: { id: scalar.id },
	// 			relations: ['vector'],
	// 		});
	//
	// 		assert.equal(result.value, scalar.value);
	// 		assert.equal(result.index, scalar.index);
	// 	});
	//
	// 	it('should relate with vector entity', async () => {
	// 		const vector = new Vector();
	// 		vector.index = 0;
	// 		vector.name = 'name';
	// 		await connection.manager.save(vector);
	//
	// 		vector.scalars = [scalar];
	// 		await connection.manager.save(vector);
	//
	// 		scalar.vector = vector;
	// 		await connection.manager.save(scalar);
	//
	// 		const result = await repository.findOne({
	// 			where: { id: scalar.id },
	// 			relations: ['vector'],
	// 		});
	//
	// 		assert.equal(result.vector.id, vector.id);
	// 	});
	// });
});
