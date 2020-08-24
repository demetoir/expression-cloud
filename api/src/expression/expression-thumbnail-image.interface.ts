import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IExpression } from './expression.interface';
import { IImage } from '../image/image.interface';

export interface IExpressionThumbnailImage extends IBaseEntity {
	expression: IExpression;
	image: IImage;
}
