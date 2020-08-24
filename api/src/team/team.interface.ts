import { IUser } from '../common/model/entity/user/user.interface';
import { IBaseEntity } from '../common/model/entity/base/base.interface';

export interface ITeam extends IBaseEntity {
	name: string;

	description: string;

	users: IUser[];
}
