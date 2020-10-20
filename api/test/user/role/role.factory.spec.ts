import { assert } from 'chai';
import { RoleEntity } from 'src/role/role.entity';
import { RoleFactory } from 'src/role/role.factory';
import { RoleEnum } from 'src/role/role.enum';
import { Connection, Repository } from 'typeorm';
import { IRole } from 'src/role/role.interface';
import { getConnection } from 'test/resource/typeorm';

describe('role factory', () => {
	let connection: Connection;
	let roleRepository: Repository<RoleEntity>;

	beforeAll(async () => {
		connection = await getConnection();

		roleRepository = connection.getRepository(RoleEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		expect(roleRepository).toBeDefined();
		expect(connection).toBeDefined();

		assert.isNotNull(roleRepository);
	});

	it('should defined self and method', function () {
		expect(RoleFactory).toBeDefined();
		expect(RoleFactory.build).toBeDefined();
		expect(RoleFactory.buildAnonymousRole).toBeDefined();
		expect(RoleFactory.buildAdminRole).toBeDefined();
		expect(RoleFactory.buildManagerRole).toBeDefined();
		expect(RoleFactory.buildUserRole).toBeDefined();
	});

	it('should buildAnonymousRole', async function () {
		const role = RoleFactory.buildAnonymousRole();

		expect(role.name).toBe(RoleEnum.anonymous);

		await roleRepository.save(role);

		const stored: IRole = await roleRepository.findOne(role.id);

		expect(stored).toBeDefined();
		expect(stored).toEqual(role);
	});

	it('should buildAdminRole', async function () {
		const role = RoleFactory.buildAdminRole();

		expect(role.name).toBe(RoleEnum.admin);

		await roleRepository.save(role);

		const stored: IRole = await roleRepository.findOne(role.id);

		expect(stored).toBeDefined();
		expect(stored).toEqual(role);
	});

	it('should buildUserRole', async function () {
		const role = RoleFactory.buildUserRole();

		expect(role.name).toBe(RoleEnum.user);

		await roleRepository.save(role);

		const stored: IRole = await roleRepository.findOne(role.id);

		expect(stored).toBeDefined();
		expect(stored).toEqual(role);
	});

	it('should buildManagerRole', async function () {
		const role = RoleFactory.buildManagerRole();

		expect(role.name).toBe(RoleEnum.manager);

		await roleRepository.save(role);

		const stored: IRole = await roleRepository.findOne(role.id);

		expect(stored).toBeDefined();
		expect(stored).toEqual(role);
	});
});
