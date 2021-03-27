import { Entity, OneToOne } from 'typeorm';
import { UserProfileImage } from '../../user';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	TextColumn,
	UpdatedAtColumn,
	VarcharColumn,
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
