import { IBaseEntity } from '../../common/model/entity/base/base.interface';
import { IUser } from '../user/user.interface';

export declare interface IUserSetting extends IBaseEntity {
	userId: number;
	user: IUser;
}
