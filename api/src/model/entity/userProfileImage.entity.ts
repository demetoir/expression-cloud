import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ImageEntity } from './image.entity';
import { UserEntity } from './user.entity';

// todo add test of UserProfileImage

@Entity({ name: 'user_profile_images' })
export class UserProfileImageEntity extends AbstractBaseEntity {
	@OneToOne(() => ImageEntity)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;

	@OneToOne(() => UserEntity, (object) => object.profileImage)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
