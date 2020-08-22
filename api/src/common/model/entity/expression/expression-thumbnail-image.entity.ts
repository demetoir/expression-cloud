import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ExpressionEntity } from './expression.entity';
import { ImageEntity } from '../image/image.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImageEntity extends BaseEntity {
	@OneToOne(() => ExpressionEntity, (object) => object.thumbnailImage)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;

	@OneToOne(() => ImageEntity, { eager: true })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
