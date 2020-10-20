import { IRole } from 'src/role/role.interface';
import { IUser } from 'src/user/user.interface';
import { RoleEnum } from 'src/role/role.enum';
import { RoleEntity } from 'src/role/role.entity';

export class RoleFactory implements IRole {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	name: RoleEnum;

	users: IUser[];

	static build(type: RoleEnum): IRole {
		const role = new RoleEntity();
		role.name = type;

		return role;
	}

	static buildAdminRole(): IRole {
		return this.build(RoleEnum.admin);
	}

	static buildUserRole(): IRole {
		return this.build(RoleEnum.user);
	}

	static buildManagerRole(): IRole {
		return this.build(RoleEnum.manager);
	}

	static buildAnonymousRole(): IRole {
		return this.build(RoleEnum.anonymous);
	}
}
