import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ImageEntity } from './image.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_profile_images' })
export class UserProfileImage extends AbstractBaseEntity {
	@ManyToOne(() => ImageEntity)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;

	@ManyToOne(() => UserEntity, (object) => object.profileImage)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
