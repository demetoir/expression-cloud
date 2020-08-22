import { ImageEntity } from '../image/image.entity';
import { UserEntity } from './user.entity';
import { IBaseEntity } from '../base/base.interface';

export interface IUserProfileImage extends IBaseEntity {
	image: ImageEntity;

	user: UserEntity;
}
