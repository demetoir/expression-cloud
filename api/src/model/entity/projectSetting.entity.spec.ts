import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { ProjectEntity } from './project.entity';
import { ProjectSettingEntity } from './projectSetting.entity';

describe('projectSetting entity', () => {
	let projectSettingRepository;
	let connection;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		projectSettingRepository = connection.getRepository(
			ProjectSettingEntity,
		);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(projectSettingRepository);
	});

	it('should create new entity', async function () {
		const role = new ProjectSettingEntity();
		await connection.manager.save(role);

		const newTeam = await projectSettingRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	describe('relation', () => {
		let projectSetting;

		it('should prepare projectSetting', async () => {
			projectSetting = new ProjectSettingEntity();

			projectSetting.name = 'projectSetting';

			await connection.manager.save(projectSetting);
		});

		it('should relate with project entity', async () => {
			const project = new ProjectEntity();
			project.name = 'user';
			project.description = 'description';
			await connection.manager.save(project);

			project.setting = projectSetting;
			await connection.manager.save(project);

			projectSetting.project = project;
			await connection.manager.save(projectSetting);

			const resultRole = await projectSettingRepository.findOne({
				where: { id: projectSetting.id },
				relations: ['project'],
			});
			await connection.manager.save(resultRole);

			assert.equal(resultRole.project.id, project.id);
		});
	});
});
