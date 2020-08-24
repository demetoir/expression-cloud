import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IUserProfileImage } from './user-profile-image.interface';
import { ImageEntity } from '../../image/image.entity';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../../common/model/entity/base/base.entity';

@Entity({ name: 'user_profile_images' })
export class UserProfileImageEntity extends BaseEntity
	implements IUserProfileImage {
	@OneToOne(() => ImageEntity)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;

	@OneToOne(() => UserEntity, (object) => object.profileImage)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
