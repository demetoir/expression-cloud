import { IBaseEntity } from 'src/common/model/entity/base/base.interface';
import { IExpression } from '../expression/expression.interface';
import { IImage } from 'src/image/image.interface';

export interface IExpressionThumbnailImage extends IBaseEntity {
	expression: IExpression;
	image: IImage;
}
