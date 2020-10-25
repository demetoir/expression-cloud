import { IUser } from 'src/user/user.interface';
import { IBaseEntity } from 'src/common/model/entity/base/base.interface';

export declare interface IUserSetting extends IBaseEntity {
	userId: number;
	user: IUser;
}
