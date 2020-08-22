import { IExpression } from '../expression/expression.interface';
import { IScalar } from '../scalar/scalar.interface';
import { IBaseEntity } from '../base/base.interface';

export interface IVector extends IBaseEntity {
	name: string;
	index: number;

	scalars: IScalar[];

	expression: IExpression;
}
