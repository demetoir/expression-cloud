import { RoleName } from 'src/core/user/model/role-name.enum';
import { Role } from 'src/core/user/model/role';

export class RoleFactory {
	static build(type: RoleName): Role {
		const role = new Role();
		role.name = type;

		return role;
	}

	static buildAdminRole(): Role {
		return RoleFactory.build(RoleName.admin);
	}

	static buildUserRole(): Role {
		return RoleFactory.build(RoleName.user);
	}

	static buildManagerRole(): Role {
		return RoleFactory.build(RoleName.manager);
	}

	static buildAnonymousRole(): Role {
		return RoleFactory.build(RoleName.anonymous);
	}
}
