import { Entity, OneToOne } from 'typeorm';
import { UserProfileImage } from '../../user';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	TextColumn,
	UpdatedAtColumn,
	UpdatedAtField,
	VarcharColumn,
} from '../../../common';

@Entity({ name: 'images' })
export class Image {
	@IdField()
	@PkColumn()
	id: number;

	@CreatedAtField()
	@CreatedAtColumn()
	createdAt: Date;

	@UpdatedAtField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DeletedAtField()
	@DeletedAtColumn()
	deletedAt: Date;

	@TextColumn()
	url: string;

	@VarcharColumn()
	extension: string;

	@TextColumn()
	path: string;

	// origin, resize, compressed, thumbnail....
	@VarcharColumn()
	type: number;

	@TextColumn()
	fileName: string;

	// @OneToOne(() => ExpressionThumbnailImageEntity, (object) => object.image)
	// expressionThumbnail: ExpressionThumbnailImageEntity;

	@OneToOne(() => UserProfileImage, (object) => object.image)
	userProfile: UserProfileImage;
}
