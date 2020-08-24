import { IExpression } from '../expression/expression/expression.interface';
import { IScalar } from '../scalar/scalar.interface';
import { IBaseEntity } from '../common/model/entity/base/base.interface';

export interface IVector extends IBaseEntity {
	name: string;
	index: number;

	scalars: IScalar[];

	expression: IExpression;
}
