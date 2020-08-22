import { Column, Entity, OneToOne } from 'typeorm';
import { ExpressionThumbnailImageEntity } from '../expression/expressionThumbnailImage.entity';
import { BaseEntity } from '../base/base.entity';
import { UserProfileImageEntity } from '../user/user-profile-image.entity';

@Entity({ name: 'images' })
export class ImageEntity extends BaseEntity {
	@Column({ name: 'url', type: 'text', nullable: false })
	url: string;

	@Column({
		name: 'extension',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	extension: string;

	@Column({
		name: 'path',
		type: 'text',
		nullable: false,
	})
	path: string;

	// origin, resize, compressed, thumbnail....
	@Column({
		name: 'type',
		type: 'int',
		nullable: false,
	})
	type: number;

	@Column({ name: 'file_name', type: 'text', nullable: false })
	fileName: string;

	@OneToOne(() => ExpressionThumbnailImageEntity, (object) => object.image)
	expressionThumbnail: ExpressionThumbnailImageEntity;

	@OneToOne(() => UserProfileImageEntity, (object) => object.image)
	userProfile: UserProfileImageEntity;
}
