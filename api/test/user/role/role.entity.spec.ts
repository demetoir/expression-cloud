import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { RoleEntity } from '../../../src/user/role/role.entity';
import { ormConfig } from '../../../src/common/model/configLoader';
import { UserEntity } from '../../../src/user/user/user.entity';
import { RoleEnum } from '../../../src/user/role/role.enum';

describe('role entity', () => {
	let connection;
	let roleRepository;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);
		await connection.synchronize();

		roleRepository = connection.getRepository(RoleEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(roleRepository);
	});

	it('should create new role', async function () {
		const role = new RoleEntity();
		role.name = RoleEnum.admin;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as user', async function () {
		const role = new RoleEntity();
		role.name = RoleEnum.user;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as manager', async function () {
		const role = new RoleEntity();
		role.name = RoleEnum.manager;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as admin', async function () {
		const role = new RoleEntity();
		role.name = RoleEnum.admin;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as anonymous', async function () {
		const role = new RoleEntity();
		role.name = RoleEnum.anonymous;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	describe('check column type', () => {
		it('should not null on name', async function () {
			try {
				const name = undefined;

				const role = new RoleEntity();
				role.name = name;
				await connection.manager.save(role);
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: roles.name',
				);
			}
		});
	});

	describe('relation', () => {
		let role;

		it('should prepare role', async () => {
			role = new RoleEntity();

			role.name = 'role';

			await connection.manager.save(role);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.roles = [role];
			await connection.manager.save(user);

			role.users = [user];
			await connection.manager.save(role);

			const resultRole = await roleRepository.findOne({
				where: { id: role.id },
				relations: ['users'],
			});
			await connection.manager.save(resultRole);

			assert.equal(resultRole.users[0].id, user.id);
		});
	});
});
