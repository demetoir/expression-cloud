import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IUser } from 'src/user/user.interface';

export interface IEditHistory extends IBaseEntity {
	refId: bigint;

	refType: bigint;

	editType: number;

	prev: IEditHistory;

	user: IUser;
}
