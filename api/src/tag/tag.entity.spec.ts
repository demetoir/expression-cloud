import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { TagEntity } from './tag.entity';
import { ormConfig } from '../common/model/configLoader';
import { expectShouldNotCallThis } from '../../test/lib/helper/jestHelper';
import { ExpressionFactory } from '../expression/expression/expression.factory';

describe('tag entity', () => {
	let connection;
	let tagRepository;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

		tagRepository = connection.getRepository(TagEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(tagRepository);
	});

	it('should create new role', async function () {
		const tag = new TagEntity();
		tag.name = 'new tag';
		await connection.manager.save(tag);

		const newTeam = await tagRepository.findOne({ id: tag.id });

		assert.isNotNull(newTeam);
	});

	describe('check column', () => {
		it('should not null on name', async function () {
			try {
				const name = undefined;

				const tag = new TagEntity();
				tag.name = name;
				await connection.manager.save(tag);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"ER_NO_DEFAULT_FOR_FIELD: Field 'name' doesn't have a default value",
				);
			}
		});
	});

	describe('relation', () => {
		let tag;

		it('should prepare tag', async () => {
			tag = new TagEntity();

			tag.name = 'new tag';

			await connection.manager.save(tag);
		});

		it('should relate with project entity', async () => {
			const expression = ExpressionFactory.build();
			await connection.manager.save(expression);

			expression.tags = [tag];
			await connection.manager.save(expression);

			tag.expression = expression;
			await connection.manager.save(tag);

			const resultProject = await tagRepository.findOne({
				where: { id: tag.id },
				relations: ['expression'],
			});
			await connection.manager.save(resultProject);

			assert.equal(resultProject.expression.id, expression.id);
		});
	});
});
