import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { Expression } from 'src/expression';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImageEntity extends BaseEntity {
	// @OneToOne(() => Expression, (object) => object.thumbnailImage, {
	// 	eager: false,
	// })
	// @JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	// expression: Expression;

	@OneToOne(() => ImageEntity, { eager: false })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
