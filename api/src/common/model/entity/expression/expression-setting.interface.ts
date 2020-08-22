import { IBaseEntity } from '../base/base.interface';
import { IExpression } from './expression.interface';

export interface IExpressionSetting extends IBaseEntity {
	isPublic: boolean;
	isLocked: boolean;
	expression: IExpression;
}
