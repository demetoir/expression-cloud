import { IBaseEntity } from 'src/common/model/entity/base/base.interface';
import { IUser } from 'src/user/user.interface';

export declare interface IUserSetting extends IBaseEntity {
	userId: number;
	user: IUser;
}
