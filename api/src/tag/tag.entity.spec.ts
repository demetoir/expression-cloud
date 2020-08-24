import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../ormconfig.js';
import { TagEntity } from './tag.entity';
import { ExpressionEntity } from '../expression/expression.entity';

describe('tag entity', () => {
	let connection;
	let tagRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

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
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: tags.name',
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
			const expression = new ExpressionEntity();

			expression.name = 'project';
			expression.description = 'description';
			expression.type = 1;
			expression.content = '1';
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
