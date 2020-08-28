import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { RoleEntity } from '../../../src/user/role/role.entity';
import { ormConfig } from '../../../src/common/model/configLoader';
import { RoleEnum } from '../../../src/user/role/role.enum';
import { RoleFactory } from '../../../src/user/role/role.factory';
import { expectShouldNotCallThis } from '../../lib/helper/jestHelper';
import { QueryFailedError } from 'typeorm/index';
import { UserFactory } from '../user/user.factory';

describe('role entity', () => {
	let connection;
	let roleRepository;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

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
				const role = RoleFactory.buildManagerRole();
				role.name = null;

				await connection.manager.save(role);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);

				expect(e.message).toBe(
					`ER_BAD_NULL_ERROR: Column 'name' cannot be null`,
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
			const user = UserFactory.build();
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
