import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IExpression } from '../common/model/entity/expression/expression.interface';

export interface ITag extends IBaseEntity {
	name: string;

	expression: IExpression;
}
