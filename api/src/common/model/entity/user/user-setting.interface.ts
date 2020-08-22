import { IBaseEntity } from '../base/base.interface';
import { IUser } from './user.interface';

export declare interface IUserSetting extends IBaseEntity {
	user: IUser;
}
