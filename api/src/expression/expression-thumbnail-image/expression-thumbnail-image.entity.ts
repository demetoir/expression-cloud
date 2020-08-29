import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ExpressionEntity } from '../expression/expression.entity';
import { ImageEntity } from '../../image/image.entity';
import { BaseEntity } from '../../common/model/entity/base/base.entity';
import { IExpressionThumbnailImage } from './expression-thumbnail-image.interface';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImageEntity extends BaseEntity
	implements IExpressionThumbnailImage {
	@OneToOne(() => ExpressionEntity, (object) => object.thumbnailImage, {
		eager: false,
	})
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;

	@OneToOne(() => ImageEntity, { eager: false })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
