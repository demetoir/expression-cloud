import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';

@Entity({ name: 'user_profile_images' })
export class UserProfileImageEntity extends BaseEntity {
	@OneToOne(() => ImageEntity)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;

	// @OneToOne(() => User, (object) => object.profileImage)
	// @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	// user: User;
}
