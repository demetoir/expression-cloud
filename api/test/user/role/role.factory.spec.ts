import { RoleFactory } from 'src/role/role.factory';
import { RoleEnum } from 'src/role/role.enum';

describe('role factory', () => {
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
	});

	it('should buildAdminRole', async function () {
		const role = RoleFactory.buildAdminRole();

		expect(role.name).toBe(RoleEnum.admin);
	});

	it('should buildUserRole', async function () {
		const role = RoleFactory.buildUserRole();

		expect(role.name).toBe(RoleEnum.user);
	});

	it('should buildManagerRole', async function () {
		const role = RoleFactory.buildManagerRole();

		expect(role.name).toBe(RoleEnum.manager);
	});
});
