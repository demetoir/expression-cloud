import { IBaseEntity } from '../base/base.interface';
import { IImage } from '../image/image.interface';
import { IUser } from './user.interface';

export interface IUserProfileImage extends IBaseEntity {
	image: IImage;

	user: IUser;
}
