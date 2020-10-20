import { IImage } from 'src/image/image.interface';
import { IUser } from 'src/user/user.interface';
import { IBaseEntity } from 'src/common/model/entity/base/base.interface';

export interface IUserProfileImage extends IBaseEntity {
	image: IImage;

	user: IUser;
}
