import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Image } from 'src/core/image/model/image';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from '../../../../common';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImage {
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
	// @OneToOne(() => Expression, (object) => object.thumbnailImage, {
	// 	eager: false,
	// })
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: Expression;

	@OneToOne(() => Image, { eager: false })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: Image;
}
