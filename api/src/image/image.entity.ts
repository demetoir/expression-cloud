import { Column, Entity, OneToOne } from 'typeorm';
import { ExpressionThumbnailImageEntity } from '../expression/expression-thumbnail-image.entity';
import { BaseEntity } from '../common/model/entity/base/base.entity';
import { UserProfileImageEntity } from '../common/model/entity/user/user-profile-image.entity';
import { IImage } from './image.interface';

@Entity({ name: 'images' })
export class ImageEntity extends BaseEntity implements IImage {
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
