import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { ExpressionEntity } from '../expression/expression.entity';

@Entity({ name: 'expression_thumbnail_images' })
export class ExpressionThumbnailImageEntity extends BaseEntity {
	@OneToOne(() => ExpressionEntity, (object) => object.thumbnailImage, {
		eager: false,
	})
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;

	@OneToOne(() => ImageEntity, { eager: false })
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity;
}
