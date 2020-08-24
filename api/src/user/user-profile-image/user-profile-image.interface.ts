import { IImage } from '../../image/image.interface';
import { IUser } from '../user/user.interface';
import { IBaseEntity } from '../../common/model/entity/base/base.interface';

export interface IUserProfileImage extends IBaseEntity {
	image: IImage;

	user: IUser;
}
