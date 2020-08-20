import { IBaseEntity } from '../base/base.interface';

export declare interface IUserEntity extends IBaseEntity {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;
}
