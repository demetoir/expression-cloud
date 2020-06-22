import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';
import { TagEntity } from './tag.entity';
import { ProjectSettingEntity } from './projectSetting.entity';
import { ExpressionEntity } from './expression.entity';

describe('project entity', () => {
	let connection;
	let projectRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		projectRepository = connection.getRepository(ProjectEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(projectRepository);
	});

	it('should create new project', async function () {
		const project = new ProjectEntity();
		project.name = 'name';
		project.description = 'description';
		await connection.manager.save(project);

		const newProject = await projectRepository.findOne({ id: project.id });

		assert.isNotNull(newProject);
	});

	describe('column type check', () => {
		it('should not null on name', async function () {
			try {
				const name = null;
				const isLocked = true;
				const isPublic = true;
				const description = 'description';

				const projectEntity = new ProjectEntity();
				projectEntity.name = name;
				projectEntity.isLocked = isLocked;
				projectEntity.isPublic = isPublic;
				projectEntity.description = description;

				await connection.manager.save(projectEntity);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: projects.name',
				);
			}
		});

		it('should not null on isPublic', async function () {
			try {
				const name = 'name';
				const isLocked = true;
				const isPublic = null;
				const description = 'description';

				const projectEntity = new ProjectEntity();
				projectEntity.name = name;
				projectEntity.isLocked = isLocked;
				projectEntity.isPublic = isPublic;
				projectEntity.description = description;

				await connection.manager.save(projectEntity);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: projects.is_public',
				);
			}
		});

		it('should isPublic auto false', async function () {
			const name = 'name';
			const isLocked = true;
			const isPublic = undefined;
			const description = 'description';

			const project = new ProjectEntity();
			project.name = name;
			project.isLocked = isLocked;
			project.description = description;
			project.isPublic = isPublic;

			await connection.manager.save(project);

			const resultProject = await projectRepository.findOne({
				id: project.id,
			});

			assert.equal(resultProject.isPublic, false);
			assert.equal(typeof resultProject.isPublic, 'boolean');
		});

		it('should not null on isLocked', async function () {
			try {
				const name = 'name';
				const isLocked = null;
				const isPublic = true;
				const description = 'description';

				const projectEntity = new ProjectEntity();
				projectEntity.name = name;
				projectEntity.isLocked = isLocked;
				projectEntity.isPublic = isPublic;
				projectEntity.description = description;

				await connection.manager.save(projectEntity);

				assert(false, 'should throw error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: projects.is_locked',
				);
			}
		});

		it('should auto false isLocked ', async function () {
			const name = 'name';
			const isLocked = undefined;
			const isPublic = false;
			const description = 'description';

			const project = new ProjectEntity();
			project.name = name;
			project.isLocked = isLocked;
			project.isPublic = isPublic;
			project.description = description;

			await connection.manager.save(project);

			const resultProject = await projectRepository.findOne({
				id: project.id,
			});

			assert.equal(resultProject.isLocked, false);
			assert.equal(typeof resultProject.isLocked, 'boolean');
		});

		it('should not null on description', async function () {
			try {
				const name = 'name';
				const isLocked = true;
				const isPublic = true;
				const description = null;

				const project = new ProjectEntity();
				project.name = name;
				project.isLocked = isLocked;
				project.isPublic = isPublic;
				project.description = description;

				await connection.manager.save(project);
				assert(false, 'should throw error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: projects.description',
				);
			}
		});
	});

	describe('relation', () => {
		let project;

		it('should prepare project', async () => {
			project = new ProjectEntity();
			project.name = 'name';
			project.description = 'description';

			await connection.manager.save(project);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.projects = [project];
			await connection.manager.save(user);

			project.user = user;
			await connection.manager.save(project);

			const resultProject = await projectRepository.findOne({
				where: { id: project.id },
				relations: ['user'],
			});

			assert.equal(resultProject.user.id, user.id);
		});

		it('should relate with tag˚ entity', async () => {
			const tag = new TagEntity();
			tag.name = 'user';
			await connection.manager.save(tag);

			tag.project = project;
			await connection.manager.save(tag);

			project.tags = [tag];
			await connection.manager.save(project);

			const resultProject = await projectRepository.findOne({
				where: { id: project.id },
				relations: ['tags'],
			});

			assert.equal(resultProject.tags[0].id, tag.id);
		});

		it('should relate with projectSetting entity', async function () {
			const setting = new ProjectSettingEntity();
			await connection.manager.save(setting);

			setting.project = project;
			await connection.manager.save(setting);

			project.setting = setting;
			await connection.manager.save(project);

			const resultProject = await projectRepository.findOne({
				where: { id: project.id },
				relations: ['setting'],
			});

			assert.equal(resultProject.setting.id, setting.id);
		});

		it('should relate with projectSetting entity', async function () {
			const expression = new ExpressionEntity();
			expression.name = 'name';
			expression.type = 1;
			expression.description = 'description';

			await connection.manager.save(expression);

			expression.project = project;
			await connection.manager.save(expression);

			project.expressions = [expression];
			await connection.manager.save(project);

			const resultProject = await projectRepository.findOne({
				where: { id: project.id },
				relations: ['expressions'],
			});

			assert.equal(resultProject.expressions[0].id, expression.id);
		});
	});
});
