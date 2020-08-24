import { IBaseEntity } from '../base/base.interface';
import { IVector } from '../../../../vector/vector.interface';

export interface IScalar extends IBaseEntity {
	value: number;

	index: number;

	vector: IVector;
}
