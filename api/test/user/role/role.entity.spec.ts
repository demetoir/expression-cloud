import { assert } from 'chai';
import { RoleEntity } from 'src/role/role.entity';
import { RoleEnum } from 'src/role/role.enum';
import { RoleFactory } from 'src/role/role.factory';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { Connection, QueryFailedError, Repository } from 'typeorm';
import { getConnectionForTest } from 'test/util/typeorm';

const database = 'role_entity';
describe('role entity', () => {
	let connection: Connection;
	let roleRepository: Repository<RoleEntity>;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);

		roleRepository = connection.getRepository(RoleEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(roleRepository);
	});

	it('should create new role', async () => {
		const role = new RoleEntity();
		role.name = RoleEnum.admin;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as user', async () => {
		const role = new RoleEntity();
		role.name = RoleEnum.user;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as manager', async () => {
		const role = new RoleEntity();
		role.name = RoleEnum.manager;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as admin', async () => {
		const role = new RoleEntity();
		role.name = RoleEnum.admin;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	it('should create role as anonymous', async () => {
		const role = new RoleEntity();
		role.name = RoleEnum.anonymous;
		await connection.manager.save(role);

		const newTeam = await roleRepository.findOne({ id: role.id });

		assert.isNotNull(newTeam);
	});

	describe('check column type', () => {
		it('should not null on name', async () => {
			try {
				const role = RoleFactory.buildManagerRole();
				role.name = null;

				await connection.manager.save(role);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);

				expect(e.message).toBe(`Column 'name' cannot be null`);
			}
		});
	});

	// describe('relation', () => {
	// 	let role;
	//
	// 	it('should prepare role', async () => {
	// 		role = new RoleEntity();
	// 		role.name = 'role';
	//
	// 		await connection.manager.save(role);
	// 	});
	//
	// 	it('should relate with user entity', async () => {
	// 		const user = UserFactory.build();
	// 		await connection.manager.save(user);
	//
	// 		user.roles = [role];
	// 		await connection.manager.save(user);
	//
	// 		role.users = [user];
	// 		await connection.manager.save(role);
	//
	// 		const resultRole = await roleRepository.findOne({
	// 			where: { id: role.id },
	// 			relations: ['users'],
	// 		});
	// 		await connection.manager.save(resultRole);
	//
	// 		assert.equal(resultRole.users[0].id, user.id);
	// 	});
	// });
});
