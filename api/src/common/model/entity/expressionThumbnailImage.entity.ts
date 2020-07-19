import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ExpressionEntity } from './expression.entity';
import { ImageEntity } from './image.entity';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImageEntity extends AbstractBaseEntity {
	@OneToOne(() => ExpressionEntity, (object) => object.thumbnailImage)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;

	@OneToOne(() => ImageEntity, { eager: true })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
