import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ImageEntity } from '../image/image.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'user_profile_images' })
export class UserProfileImageEntity extends BaseEntity {
	@OneToOne(() => ImageEntity)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;

	@OneToOne(() => UserEntity, (object) => object.profileImage)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
