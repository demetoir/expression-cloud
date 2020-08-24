import { IExpression } from '../common/model/entity/expression/expression.interface';
import { IScalar } from '../common/model/entity/scalar/scalar.interface';
import { IBaseEntity } from '../common/model/entity/base/base.interface';

export interface IVector extends IBaseEntity {
	name: string;
	index: number;

	scalars: IScalar[];

	expression: IExpression;
}
