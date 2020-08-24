import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IImage } from '../image/image.interface';
import { IUser } from './user/user.interface';

export interface IUserProfileImage extends IBaseEntity {
	image: IImage;

	user: IUser;
}
