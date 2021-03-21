import { Column, Entity, OneToOne } from 'typeorm';
import { UserProfileImage } from '../../user';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'images' })
export class Image {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField({ nullable: true })
	@DeletedAtColumn()
	deletedAt: Date;

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

	// @OneToOne(() => ExpressionThumbnailImageEntity, (object) => object.image)
	// expressionThumbnail: ExpressionThumbnailImageEntity;

	@OneToOne(() => UserProfileImage, (object) => object.image)
	userProfile: UserProfileImage;
}
