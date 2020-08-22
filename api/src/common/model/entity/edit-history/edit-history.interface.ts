import { IBaseEntity } from '../base/base.interface';
import { IUser } from '../user/user.interface';

export interface IEditHistory extends IBaseEntity {
	refId: bigint;

	refType: bigint;

	editType: number;

	prev: IEditHistory;

	user: IUser;
}
