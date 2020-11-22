import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IUser } from '../user';

export interface IEditHistory extends IBaseEntity {
	refId: bigint;

	refType: bigint;

	editType: number;

	prev: IEditHistory;

	user: IUser;
}
