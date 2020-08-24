import { IBaseEntity } from '../../common/model/entity/base/base.interface';
import { IExpression } from '../expression/expression.interface';

export interface IExpressionSetting extends IBaseEntity {
	isPublic: boolean;
	isLocked: boolean;
	expression: IExpression;
}
