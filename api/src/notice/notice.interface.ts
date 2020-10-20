import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IUser } from 'src/user/user.interface';

export interface INotice extends IBaseEntity {
	content: string;

	isRead: boolean;

	user: IUser;
}
