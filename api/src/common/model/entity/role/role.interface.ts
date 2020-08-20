import { IBaseEntity } from '../base/base.interface';
import { IUserEntity } from '../user/user.interface';

export declare interface IRole extends IBaseEntity {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	name: string;

	users: IUserEntity[];
}
