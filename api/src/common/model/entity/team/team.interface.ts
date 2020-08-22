import { IUser } from '../user/user.interface';
import { IBaseEntity } from '../base/base.interface';

export interface ITeam extends IBaseEntity {
	name: string;

	description: string;

	users: IUser[];
}
