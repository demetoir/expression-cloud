import { IUser } from '../user';
import { IBaseEntity } from '../common/model/entity/base/base.interface';

export interface IComment extends IBaseEntity {
	content: string;

	refType: bigint;

	refId: bigint;

	user: IUser;
}
