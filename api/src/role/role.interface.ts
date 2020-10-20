import { IBaseEntity } from 'src/common/model/entity/base/base.interface';
import { IUser } from 'src/user/user.interface';
import { RoleEnum } from 'src/role/role.enum';

export declare interface IRole extends IBaseEntity {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	name: RoleEnum;

	users: IUser[];
}
