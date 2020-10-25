import { IUser } from 'src/user/user.interface';
import { INode, ITimeStamp } from 'src/common/model/entity/base/node';

export declare interface IUserSetting extends INode, ITimeStamp {
	userId: number;
	user: IUser;
}
