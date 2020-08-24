import { IBaseEntity } from '../../common/model/entity/base/base.interface';
import { IUser } from '../user.interface';

export interface IOauth extends IBaseEntity {
	type: number;

	authId: string;

	user: IUser;
}
