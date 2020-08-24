import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IExpression } from '../expression/expression/expression.interface';

export interface ITag extends IBaseEntity {
	name: string;

	expression: IExpression;
}
