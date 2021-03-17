import { assert } from 'chai';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { getConnectionForTest } from 'test/util/typeorm';
import { Connection, Repository } from 'typeorm';
import { Tag } from './tag';

const database = 'tag_entity';
describe('tag entity', () => {
	let connection: Connection;
	let tagRepository: Repository<Tag>;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);
		tagRepository = connection.getRepository(Tag);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(tagRepository);
	});

	it('should create new role', async () => {
		const tag = new Tag();
		tag.name = 'new tag';
		await connection.manager.save(tag);

		const newTeam = await tagRepository.findOne({ id: tag.id });

		assert.isNotNull(newTeam);
	});

	describe('check column', () => {
		it('should not null on name', async () => {
			try {
				const name = undefined;

				const tag = new Tag();
				tag.name = name;
				await connection.manager.save(tag);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe(
					"Field 'name' doesn't have a default value",
				);
			}
		});
	});

	// describe('relation', () => {
	// 	let tag;
	//
	// 	it('should prepare tag', async () => {
	// 		tag = new TagEntity();
	//
	// 		tag.name = 'new tag';
	//
	// 		await connection.manager.save(tag);
	// 	});
	//
	// 	it('should relate with project entity', async () => {
	// 		const expression = ExpressionFactory.build();
	// 		await connection.manager.save(expression);
	//
	// 		expression.tags = [tag];
	// 		await connection.manager.save(expression);
	//
	// 		tag.expression = expression;
	// 		await connection.manager.save(tag);
	//
	// 		const resultProject = await tagRepository.findOne({
	// 			where: { id: tag.id },
	// 			relations: ['expression'],
	// 		});
	// 		await connection.manager.save(resultProject);
	//
	// 		assert.equal(resultProject.expression.id, expression.id);
	// 	});
	// });
});
