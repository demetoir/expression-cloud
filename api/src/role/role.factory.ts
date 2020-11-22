import { RoleEnum } from 'src/role/role.enum';
import { RoleEntity } from 'src/role/role.entity';

export class RoleFactory {
	static build(type: RoleEnum): RoleEntity {
		const role = new RoleEntity();
		role.name = type;

		return role;
	}

	static buildAdminRole(): RoleEntity {
		return RoleFactory.build(RoleEnum.admin);
	}

	static buildUserRole(): RoleEntity {
		return RoleFactory.build(RoleEnum.user);
	}

	static buildManagerRole(): RoleEntity {
		return RoleFactory.build(RoleEnum.manager);
	}

	static buildAnonymousRole(): RoleEntity {
		return RoleFactory.build(RoleEnum.anonymous);
	}
}
