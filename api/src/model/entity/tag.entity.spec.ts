import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { TagEntity } from './tag.entity';
import { ProjectEntity } from './project.entity';

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
			const project = new ProjectEntity();

			project.name = 'project';
			project.description = 'description';
			await connection.manager.save(project);

			project.tags = [tag];
			await connection.manager.save(project);

			tag.project = project;
			await connection.manager.save(tag);

			const resultProject = await tagRepository.findOne({
				where: { id: tag.id },
				relations: ['project'],
			});
			await connection.manager.save(resultProject);

			assert.equal(resultProject.project.id, project.id);
		});
	});
});
