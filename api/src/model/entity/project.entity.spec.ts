import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';

describe('project entity', () => {
	let userRepository;
	let connection;
	let projectRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userRepository = connection.getRepository(UserEntity);
		projectRepository = connection.getRepository(ProjectEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function() {
		assert.isNotNull(userRepository);
		assert.isNotNull(projectRepository);
	});

	it('should create new project', async function() {
		const project = new ProjectEntity();
		project.name = 'name';
		project.description = 'description';
		await connection.manager.save(project);

		const newProject = projectRepository.findOne({ id: project.id });

		assert.isNotNull(newProject);
	});

	describe('column check', () => {
		it('should not null on name', async function() {
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

		it('should not null on isPublic', async function() {
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

		it('should isPublic auto false', async function() {
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
		});

		it('should not null on isLocked', async function() {
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

		it('should auto false isLocked ', async function() {
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
		});

		it('should not null on description', async function() {
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

	// todo add test for userSetting entity
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

			const resultUserSetting = await projectRepository.findOne({
				where: { id: project.id },
				relations: ['user'],
			});

			assert.equal(resultUserSetting.user.id, user.id);
		});
	});
});
