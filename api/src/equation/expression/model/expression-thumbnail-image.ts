import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdColumn,
	IdField,
	UpdatedAtColumn,
} from '../../../common';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImage {
	@IdField()
	@IdColumn()
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

	@OneToOne(() => ImageEntity, { eager: false })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
