import { IBaseEntity } from '../base/base.interface';
import { IExpression } from '../expression/expression.interface';

export interface ITag extends IBaseEntity {
	name: string;

	expression: IExpression;
}
