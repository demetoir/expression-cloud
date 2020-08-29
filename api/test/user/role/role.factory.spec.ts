import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { RoleEntity } from '../../../src/user/role/role.entity';
import { ormConfig } from '../../../src/common/model/configLoader';
import { RoleFactory } from '../../../src/user/role/role.factory';
import { RoleEnum } from '../../../src/user/role/role.enum';
import { Connection, Repository } from 'typeorm/index';
import { IRole } from '../../../src/user/role/role.interface';

describe('role factory', () => {
	let connection: Connection;
	let roleRepository: Repository<RoleEntity>;

	beforeAll(async () => {
		connection = await createConnection(ormConfig);

		roleRepository = connection.getRepository(RoleEntity);
	});

	afterAll(async () => {
		connection.close();
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
