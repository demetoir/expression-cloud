import { IBaseEntity } from '../../common/model/entity/base/base.interface';
import { IUser } from '../user/user.interface';
import { RoleEnum } from './role.enum';

export declare interface IRole extends IBaseEntity {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	name: RoleEnum;

	users: IUser[];
}
