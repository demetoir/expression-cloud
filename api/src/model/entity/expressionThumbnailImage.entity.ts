import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ExpressionEntity } from './expression.entity';
import { ImageEntity } from './image.entity';

// todo test
@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImageEntity extends AbstractBaseEntity {
	@ManyToOne((type) => ExpressionEntity, (object) => object.thumbnailImage)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;

	@ManyToOne((type) => ImageEntity)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
