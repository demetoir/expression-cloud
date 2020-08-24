import { IBaseEntity } from '../base/base.interface';
import { IUser } from '../../../../user/user.interface';

export interface IComment extends IBaseEntity {
	content: string;

	refType: bigint;

	refId: bigint;

	user: IUser;
}
