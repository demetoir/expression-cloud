import { UserEntity } from './user.entity';
import { IBaseEntity } from '../base/base.interface';

export interface IOauth extends IBaseEntity {
	type: number;

	authId: string;

	user: UserEntity;
}
