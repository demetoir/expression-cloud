import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Image } from 'src/core/image/model/image';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	PkColumn,
	UpdatedAtColumn,
} from '../../../../common';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImage {
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
	// @OneToOne(() => Expression, (object) => object.thumbnailImage, {
	// 	eager: false,
	// })
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: Expression;

	@OneToOne(() => Image, { eager: false })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: Image;
}
