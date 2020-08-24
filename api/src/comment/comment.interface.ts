import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IUser } from '../user/user/user.interface';

export interface IComment extends IBaseEntity {
	content: string;

	refType: bigint;

	refId: bigint;

	user: IUser;
}
