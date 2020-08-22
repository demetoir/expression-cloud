import { IBaseEntity } from '../base/base.interface';
import { IUser } from '../user/user.interface';

export interface INotice extends IBaseEntity {
	content: string;

	isRead: boolean;

	user: IUser;
}
