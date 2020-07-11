import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ExpressionThumbnailImageEntity } from './expressionThumbnailImage.entity';
import { UserProfileImageEntity } from './userProfileImage.entity';

@Entity({ name: 'images' })
export class ImageEntity extends AbstractBaseEntity {
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
