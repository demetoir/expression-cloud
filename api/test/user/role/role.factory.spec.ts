import { RoleFactory } from 'src/core/user/model/role.factory';
import { RoleName } from 'src/core/user/model/role-name.enum';

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

		expect(role.name).toBe(RoleName.anonymous);
	});

	it('should buildAdminRole', async function () {
		const role = RoleFactory.buildAdminRole();

		expect(role.name).toBe(RoleName.admin);
	});

	it('should buildUserRole', async function () {
		const role = RoleFactory.buildUserRole();

		expect(role.name).toBe(RoleName.user);
	});

	it('should buildManagerRole', async function () {
		const role = RoleFactory.buildManagerRole();

		expect(role.name).toBe(RoleName.manager);
	});
});
